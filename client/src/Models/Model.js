const axios = require('axios').default;
class Model {
    constructor() {
        this.apiEndPoint = "http://localhost:4001"
    }
    get(path, params, callback) {
        axios.get(
            this.apiEndPoint + path, 
            { 
                params : params ,
                headers : {
                    
                },
            })
        .then(function (res) {
            callback(res.data, null)
            return
        }).catch(function (error) {
            console.log(error)
            callback(null, "Opps there is something wrong with our servers, please try again later")
            return
        });
    }
    postReq(path, body, callback){
        axios.post(
            this.apiEndPoint + path,
            body,
            {
                headers: {
                    'Content-Type' : 'application/json',
                }
            })
        .then(function (response) {
            if (response !== null) {
                callback(response.data, null)
                return
            }
        })
        .catch(function (error) {
            console.log(error)
            callback(null, "Opps there is something wrong with our servers, please try again later")
            return
        });
    }
}
export default Model;