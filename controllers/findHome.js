let express = require('express');
let router = express.Router();
let server_config = require('../config/server_config');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Find Home', host_address: server_config.hosting_server_ip, port: server_config.port_no});
});

module.exports = router;
