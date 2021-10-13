const calendar = {
  data() {
    return {
      monthNum: {
        'Jan': '01',
        'Feb': '02',
        'Mar': '03',
        'Apr': '04',
        'May': '05',
        'Jun': '06',
        'Jul': '07',
        'Aug': '08',
        'Sep': '09',
        'Oct': '10',
        'Nov': '11',
        'Dec': '12',
      }
    }
  },
  methods: {
    getDateToday() {
      let today = new Date();
      return String(today.getFullYear()).substr(2, 2) +
        String(today.getMonth() + 1).padStart(2, '0') + 
        String(today.getDate()).padStart(2, '0');
    }
  },
}

export default calendar;
