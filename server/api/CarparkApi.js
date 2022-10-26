const ServiceManager = require('../service/ServiceManager.js')
const fetch = require('node-fetch');
class CarkparkApi {
    constructor () {
        this.serviceManager = ServiceManager
    }

    ListCarpark(callback){
        this.serviceManager.GetCarparkService().ListCarpark(callback)
    }

    ListAPi(callback){
        fetch("https://api.data.gov.sg/v1/transport/carpark-availability", {
            headers: {
                "Content-Type" : "application/json"
            },
            method : "GET"
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            var result = response ? response.items : null
            callback(result, null)
        }).catch(error => {
            callback(null, error)
        })
    }
    
}



module.exports = new CarkparkApi();
