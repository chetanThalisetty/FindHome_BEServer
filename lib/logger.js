let logger = require('winston');
const log_config = require('../config/log_config');
logger.remove(logger.transports.Console);
logger.add(logger.transports.File, { filename: log_config.infoFileName});
logger.level = log_config.infoLevel;
module.exports = logger;