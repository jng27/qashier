const SQLInterface = require('./SQLInterface.js')
const CarparkService = require('./CarparkService.js')
class ServiceManager {
    constructor() {
        this.sqlInterface = SQLInterface
        this.carparkService = new CarparkService(SQLInterface)
    }
    //Handle all imports of my Interface in this file
    GetCarparkService() {
        return this.carparkService
    }
}
module.exports = new ServiceManager();
