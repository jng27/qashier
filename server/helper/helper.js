module.exports = {
    callback : (res,value,err, status) => {
      if (err == null) {
        res.send({ success: true, value : value }).status(status);
      } else {
        console.log(err)
        res.send({ success: false, error : err }).status(500);
      }
    }
}