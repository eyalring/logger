const my = require('../loggers.js')
const logger = new my.Logger();
console.log('we started');
logger.debug("hello world");
logger.debug("hello world second line");
logger.warning("hello warning");
logger.error("hello error");
console.log('we ended');
