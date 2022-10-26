const ServiceManager = require('../service/ServiceManager.js')
const fetch = require('node-fetch');
const moment = require('moment');
class CarkparkApi {
    constructor () {
        this.serviceManager = ServiceManager
    }

    ListCarpark(callback){
        this.serviceManager.GetCarparkService().ListCarpark(callback)
    }

    ListAPi(callback){
        // var date = new moment()
        // date = date.local().format('YYYY-MM-DD[T]HH:mm:ss').toString()
        // let url = `https://api.data.gov.sg/v1/transport/carpark-availability/?date_time=${date}`
        // console.log(date)
        let url = `https://api.data.gov.sg/v1/transport/carpark-availability`
        fetch(url, {
            headers: {
                "Content-Type" : "application/json"
            },
            method : "GET"
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            var result = response ? response.items : null
            callback(result, null)
        }).catch(error => {
            // callback(null, error)
            console.log(error)
            this.ListAPi(callback)
        })
    }
    
}



module.exports = new CarkparkApi();
