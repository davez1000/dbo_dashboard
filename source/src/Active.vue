<template>
  <div id="mi-dashboard-active" class="mi-dashboard">
    <h2>Logged in / active users</h2>

    <div class="filters">

      <button id="reload" :class="isLoading ? 'reload-loading' : ''" @click="reload" v-text="isLoading ? 'Loading...' : 'Reload'"></button>

    </div>

    <template v-if="activeUsers.length > 0">
      <table class="tg">
        <thead>
          <tr class="tg-header">
            <th>In the last</th>
            <th>Number of users active</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tg-results" v-for="(item, index) in activeUsers[0]" :key="index">
            <td>{{ index }} {{ index == 1 ? 'hour' : 'hours' }}</td>
            <td>{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <table class="tg">
        <thead>
          <tr class="tg-header">
            <th>No users</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tg-results">
            <td>No users have been active.</td>
          </tr>
        </tbody>
      </table>
    </template>

  </div>
</template>

<script>
import { calColour } from '@/scripts'
import Calendar from '@/mixins/calendar';

export default {
  name: 'Active',
  mixins: [Calendar],
  data() {
    return {
      roleSelect: '',
      cal_selectedDate: null,
      cal_mode: 'range',
      cal_datePopUp: false,
      calColour: calColour(),
    }
  },
  created() {
    this.calColour = calColour()

    this.$store.dispatch('loadActive', {
      date: this.getDateToday(),
      role: 0
    });
  },
  methods: {
    reload() {
      this.loading = true;

      this.$store.dispatch('loadActive')
    },
    buildDate(dateStr) {
      let date = dateStr + '';
      let adjDate = date.split(' ');
      return adjDate[3].substr(2, 2) + this.monthNum[adjDate[1]] + adjDate[2];
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.activeLoading;
    },
    activeUsers() {
      return this.$store.getters.activeData;
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.mi-dashboard {
  padding-top:40px;
}
#mi-dashboard-active {
  margin: 0 auto;
  min-width: 300px;
  width: 60vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .filters {
    display: inline-block;
    margin: 0 0 10px 0;
    color: black;
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
