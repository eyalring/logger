
const loggingLevelMapping  = {
    DEBUG : 50,
    INFO : 30,
    WARNING : 20,
    ERROR : 10
}

module.exports = function (currentLogLevel,requiredLogLevel){
    return loggingLevelMapping[requiredLogLevel.toString().toUpperCase()] >= loggingLevelMapping[currentLogLevel.toString().toUpperCase()];
}