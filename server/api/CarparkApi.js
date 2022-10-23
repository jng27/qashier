const ServiceManager = require('../service/ServiceManager.js')
class CarkparkApi {
    constructor () {
        this.serviceManager = ServiceManager
    }

    ListCarpark(callback){
        this.serviceManager.GetCarparkService().ListCarpark(callback)
    }
    
}



module.exports = new CarkparkApi();
