var express = require('express');
var router = express.Router();
const helper = require("../helper/helper");
const carparkApi = require("../api/CarparkApi");
/* Carpark */
router.get(`/test`, (req, res) => {
  helper.callback(res, "Backend is alive", null, 200)
})

router.get('/carpark', function(req, res, next) {
  carparkApi.ListCarpark((val, err) => {
    helper.callback(res, val, err, 200)
  })
});

router.get('/api', function(req, res, next) {
  // console.log(req.query)
  // var datetime = req.query.date_time
  carparkApi.ListAPi((val, err) => {
    helper.callback(res, val, err, 200)
  })
});

module.exports = router;
