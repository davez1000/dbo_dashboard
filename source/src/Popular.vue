<template>
  <div id="mi-dashboard-popular" class="mi-dashboard">
    <h2>Popular content search by role</h2>

    <div class="filters">
      <div v-if="cal_datePopUp">
        <v-date-picker
          :columns="3"
          :mode='cal_mode'
          v-model='cal_selectedDate'
          :color="calColour"
          locale="en-AU"
          is-inline
        />
      </div>
      <button
       id="date-select"
       :class="{ 'enabled' : this.cal_datePopUp }"
       @click="cal_datePopUp = !cal_datePopUp"
       v-text="!this.cal_datePopUp ? 'Select Date(s)' : 'Close'"
      >
      </button>

      <div class="multi-select">
        <multiselect
          v-model="roleValues"
          placeholder="Search and add roles"
          label="name"
          track-by="machine_name"
          :options="roleOptions"
          :multiple="true"
          :taggable="false"
          :close-on-select="true"
        >
        </multiselect>
      </div>

      <button id="reload" :class="isLoading ? 'reload-loading' : ''" @click="reload" v-text="isLoading ? 'Loading...' : 'Reload'"></button>

    </div>

    <template v-if="popular.length > 0">
      <table class="tg">
        <thead>
          <tr class="tg-header">
            <th>Title</th>
            <th>Number of views</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tg-results" v-for="(item, index) in popular" :key="index">
            <td><a :href="item.node.aurl">{{ item.node.title }}</a></td>
            <td>{{ item.node.count }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <table class="tg">
        <thead>
          <tr class="tg-header">
            <th>No data</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tg-results">
            <td>No data to show for the selected date(s)</td>
          </tr>
        </tbody>
      </table>
    </template>
    <Plotly
      v-if="chart.showChart && !isLoading"
      :data="chart.data"
      :layout="chart.layout"
      :display-mode-bar="false"
    >
    </Plotly>

  </div>
</template>

<script>
import { calColour } from '@/scripts'
import Calendar from '@/mixins/calendar';
import { Plotly } from 'vue-plotly'
import Multiselect from 'vue-multiselect'

export default {
  name: 'Popular',
  mixins: [Calendar],
  components: {
    Plotly,
    Multiselect,
  },
  data() {
    return {
      roleOptions: [],
      roleValues: [],
      chart: {
        showChart: false,
        data: [
          {
            y: [],
            x: [],
            name: "",
            type: "bar",
          },
          // {
          //   y: [],
          //   x: [],
          //   type: "bar",
          // }
        ],
        layout: {
          title: "Popular content",
        },
      },

      roleSelect: '',
      cal_selectedDate: null,
      cal_mode: 'range',
      cal_datePopUp: false,
      calColour: calColour(),
    }
  },
  created() {
    this.calColour = calColour()

    this.$store.dispatch('loadPopular', {
      date: this.getDateToday(),
      role: 0
    });
    this.$store.dispatch('loadRoles');
  },
  methods: {
    reload() {
      this.loading = true;
      let date = "0";
      if (this.cal_selectedDate != null) {
        let startDate = this.buildDate(this.cal_selectedDate.start);
        let endDate = this.buildDate(this.cal_selectedDate.end);
        date = startDate == endDate ? startDate : `${startDate},${endDate}`;
      }

      let role = 0;
      if (this.roleValues.length > 0) {
        let roleConcat = [];
        this.roleValues.forEach(r => {
          roleConcat.push(r.machine_name);
        })
        role = roleConcat.join(',');
      }

      this.$store.dispatch('loadPopular', {
        date: date,
        role: role
      })
    },
    buildDate(dateStr) {
      let date = dateStr + '';
      let adjDate = date.split(' ');
      return adjDate[3].substr(2, 2) + this.monthNum[adjDate[1]] + adjDate[2];
    },
  },
  computed: {
    popular() {
      return this.$store.getters.popularData;
    },
    allRoles() {
      return this.$store.getters.roles.data;
    },
    isLoading() {
      return this.$store.getters.popularLoading;
    },
  },
  watch: {
    allRoles(value) {
      this.roleOptions = value;
    },
    popular(value) {
      this.chart.data[0].y = [];
      this.chart.data[0].x = [];
      if (!('error' in value)) {
        this.chart.showChart = true;
        value.forEach(item => {
          this.chart.data[0].y.push(item.node.count);
          this.chart.data[0].x.push(item.node.title);
        })
      } else {
        this.chart.showChart = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./styles.css";
#mi-dashboard-popular {
  margin: 0 auto;
  min-width: 300px;
  width: 60vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .filters {
    // display: inline-block;
    margin: 0 0 10px 0;
    color: black;
    .multi-select {
      margin: 5px 0 5px 0;
      max-width: 50vw;
    }
    select#role {
      margin: 5px;
      font-size: 20px;
      padding:10px;
      height: 50px;
      outline: none;
      width: 500px;
    }
    button {
      cursor: pointer;
      &#date-select, &#reload {
        font-size: 20px;
        border: none;
        box-shadow: none;
        height: 50px;
        background-color: #689bcf;
        outline: none;
        color: white;
        &.enabled {
          background-color: rgb(1, 145, 56);
        }
        &.reload-loading {
          background-color: rgb(1, 145, 56);
          cursor: default;
        }
      }
    }
  }
  .tg {
    margin: 0 auto;
    width: 60vw;
    border-collapse:collapse;
    border-spacing:0;
    a {
      text-decoration: none;
      color: black;
      &:hover {
        text-decoration: underline;
      }
    }
    td {
      border-color:white;
      border-style:solid;
      border-width:2px;
      font-family:Arial, sans-serif;
      font-size:14px;
      overflow:hidden;
      padding:6px 7px;
      word-break:normal;
      color: black;
    }
    th {
      border-color:white;
      border-style:solid;
      border-width:2px;
      font-family:Arial, sans-serif;
      font-size:14px;
      overflow:hidden;
      padding:6px 7px;
      word-break:normal;
      color: white;
    }
    .tg-header {
      background-color:#699bd0;
      // border-color:white;
      color:white;
      font-weight:bold;
      text-align:left;
      vertical-align:top;
    }
    .tg-results {
      background-color:#ebf0f6;
      text-align:left;
      vertical-align:top;
      color: black;
    }
    .tg-results:nth-child(even) {
      background-color: #d5deed;
      color: black;
    }
    .tg-results:nth-child(odd) {
      background-color: #ebf0f6;
      color: black;
    }
  }
  .loader {
    margin: 10px 0 0 0;
    font-size: 1.2em;
    color: black;
  }
}

</style>
