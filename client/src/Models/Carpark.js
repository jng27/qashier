import Model from './Model'
class Carpark extends Model {
    GetCarpark(callback) {
        super.get(`/carpark`, null, (res,err) => {
            if (res && res.success) {
                callback(res.value,null)
            } else {
                callback(null,err || res.error)
            }
        })
    }
}
export default Carpark;