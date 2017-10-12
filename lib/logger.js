let logger = require('winston');
const log_config = require('../config/log_config');
const rootPath = require('app-root-path').toString();
const path = require('path');

const logDirectory = path.join(rootPath, log_config.infoFileName);

logger.remove(logger.transports.Console);
logger.add(logger.transports.File, { filename: logDirectory});
logger.level = log_config.infoLevel;

module.exports = logger;