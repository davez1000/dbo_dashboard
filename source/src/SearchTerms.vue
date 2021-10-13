<template>
  <div id="mi-dashboard-searchterms" class="mi-dashboard">
    <h2>Failed search terms</h2>

    <div class="filters">

      <button id="reload" :class="isLoading ? 'reload-loading' : ''" @click="reload" v-text="isLoading ? 'Loading...' : 'Reload'"></button>

    </div>
    <div v-if="this.pagination.numberOfPages > 0" class="pagination">
      <div class="page-number">Page {{ this.pagination.currentPage }} of {{ this.pagination.numberOfPages }}</div>
      <div v-if="this.pagination.numberOfPages > 1" class="prevnext">
        <div class="prev"><button @click="this.goPreviousPage" :disabled="this.pagination.currentPage <= 1" id="prev-page" class="prev-page">&lt;&lt; Prev</button></div>
        <div class="next"><button @click="this.goNextPage" :disabled="this.pagination.currentPage >= this.pagination.numberOfPages" id="next-page" class="next-page">Next &gt;&gt;</button></div>
      </div>
    </div>

    <template v-if="this.storeData.length > 0">
      <table class="tg">
        <thead>
          <tr class="tg-header">
            <th>Term</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tg-results" v-for="(item, index) in this.storeData" :key="index">
            <td>{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <table class="tg">
        <thead>
          <tr class="tg-header">
            <th>No terms</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tg-results">
            <td>Currently there are no failed search terms to display.</td>
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
  name: 'SearchTerms',
  mixins: [Calendar],
  data() {
    return {
      roleSelect: '',
      cal_selectedDate: null,
      cal_mode: 'range',
      cal_datePopUp: false,
      calColour: calColour(),
      allData: [],
      storeData: [],
      pagination: {
        itemsPerPage: 10,
        numberOfPages: 0,
        currentPage: 1,
      }
    }
  },
  created() {
    this.calColour = calColour()

    this.$store.dispatch('loadSearchTerms');
  },
  methods: {
    goPreviousPage() {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage--;
        this._paginate(this.allData);
      }
    },
    goNextPage() {
      if (this.pagination.currentPage < this.pagination.numberOfPages) {
        this.pagination.currentPage++;
        this._paginate(this.allData);
      }
    },
    reload() {
      this.loading = true;
      this.$store.dispatch('loadSearchTerms')
    },
    _paginate(data) {
      this.pagination.numberOfPages = Math.ceil(data.length / 10);
      let start = (this.pagination.currentPage * this.pagination.itemsPerPage) - this.pagination.itemsPerPage;
      let end = this.pagination.currentPage * this.pagination.itemsPerPage;
      this.storeData = data.slice(start, end);
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.searchTermsLoading;
    },
    searchTerms() {
      return this.$store.getters.searchTermsData;
    }
  },
  watch: {
    searchTerms(value) {
      this.allData = value;
      this._paginate(value);
    }
  }
}
</script>

<style lang="scss" scoped>
.mi-dashboard {
  padding-top:40px;
}
#mi-dashboard-searchterms {
  margin: 0 auto;
  min-width: 300px;
  width: 60vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .pagination {
    display: flex;
    justify-content: space-between;
    .prevnext {
      display: flex;
      .prev {
        margin: 0 50px 0 0;
      }
      .next {
        margin: 0 10px 0 0;
      }
      button {
        color: black;
      }
      button[disabled] {
        color: grey;
      }
    }
    .page-number {
      margin: 0 0 0 10px;
    }
    button {
      cursor: pointer;
      font-size: 15px;
      border: none;
      box-shadow: none;
      height: 25px;
      outline: 1px solid #d5deed;
      background-color: #ebf0f6;
      margin: 0 0 2px 0;
      &:disabled {
        cursor: default;
      }
    }
  }
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
