<template>
  <div id="mi-dashboard-version" class="mi-dashboard">
    <div class="version-details">
      version {{ version }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Version',
  data() {
    return {
      version: '1.1',
    }
  },
  created() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.mi-dashboard {
  padding-top:40px;
}
#mi-dashboard-version {
  margin: 0 auto;
  min-width: 300px;
  width: 60vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .version-details {
    text-align: right;
    margin: 5px 5px 5px 0;
    font-size: 0.8em;
  }
}

</style>
