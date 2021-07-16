const app = Vue.createApp({
  data(){
    return {
      title: 'Salmon Cookies',
      times: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
      stores: [
        {
          location: 'Seattle',
          min: 23,
          max: 65,
          avgSales: 6.3,
          totalCookies: 3759,
          dailyReport: [215, 215, 334, 290, 259, 183, 246, 271 , 297, 227, 278, 397, 252, 285]
        },
        {
          location: 'Tokyo',
          min: 3,
          max: 24,
          avgSales: 1.2,
          totalCookies: 226,
          dailyReport: [4, 18, 23, 27, 4, 27, 27, 14, 12, 22, 4, 8, 28, 8]
        }
      ],
      newLocation: '',
      minCust: 0,
      maxCust: 0,
      avgSales: 0,
      dailyReport: [],
      totalCookies: 0,
      grandTotalCookies: 0,
      totalHourly: [],
    }
  },
  methods: {
      updateLocation (e) {
        this.newLocation = e.target.value
        console.log(this.newLocation)
      },
      updateMin (e){
        this.min = e.target.value
        console.log(this.min)
      },
      updateMax (e){
        this.max = e.target.value
        console.log(this.max)
      },
      updateAvgSales (e){
        this.avgSales = e.target.value
        console.log(this.avgSales)
      },
      getCustomers(){
        let hourlyCustomers = Math.floor(Math.random() * (this.max - this.min) + this.min)
        return hourlyCustomers;
      },
      getHourlySales(){
        let hourly = Math.ceil(this.avgSales * this.getCustomers());
        this.dailyReport.push(hourly)
        return hourly;
      },
      formSubmit(e) {
        e.preventDefault()
        if(!this.newLocation || !this.min || !this.max || !this.avgSales){
          alert('Please fill out form completely')
        } else {
          for (var i = 0; i < this.times.length; i++) {
            this.totalCookies += this.getHourlySales();
          }
          let newLocation = {
            location: this.newLocation,
            min: this.min,
            max: this.max,
            avgSales: this.avgSales,
            totalCookies: this.totalCookies,
            dailyReport: this.dailyReport
          }
          this.stores.push(newLocation)
          this.calculateTotals()

          // Reset
          this.dailyReport = []
          this.newLocation = '';
          this.max = 0
          this.min = 0
          this.avgSales = 0
          }
        },
      calculateTotals(){
        this.totalHourly = []
        this.grandTotalCookies = 0
        for (let i = 0; i < this.times.length; i++){
          let totalHourlySales = 0;
          for (let j = 0; j < this.stores.length; j++){
            totalHourlySales += this.stores[j].dailyReport[i];
          }
          this.totalHourly.push(totalHourlySales)
          this.grandTotalCookies += totalHourlySales
        }
      }
  },
  mounted() {
    calculateTotals()
    this.init()
  }
})

app.mount('#app')

// {
//   location: 'Dubai',
//   min: 11,
//   max: 38,
//   avgSales: 2.7,
//   totalCookies: 0,
//   dailyReport: ['Dubai', 73, 29, 100, 73, 74, 95, 33, 63, 45, 76, 12, 43, 45, 76]
// },
// {
//   location: 'Paris',
//   min: 20,
//   max: 38,
//   avgSales: 2.3,
//   totalCookies: 0,
//   dailyReport: ['Paris', 76, 45, 56, 47, 85, 74, 57, 68, 54, 36, 47, 86, 54, 43]
// },
// {
//   location: 'Lima',
//   min: 2,
//   max: 16,
//   avgSales: 4.6,
//   totalCookies: 0,
//   dailyReport: ['Lima', 26, 38, 54, 63, 74, 58, 60, 39, 40, 35, 43, 25, 36, 54]
// }