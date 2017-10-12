/**
 * common response object to hold the status and messages of all requests made
 * @param status : either error or success
 * @param message: message related to that
 */
function response(status, message) {
    this.status = status;
    this.message = message;
}

module.exports = response;
