const fs = require('fs');
const readable = require('stream').Readable;
const path = require('path');
const loggerLevelChecker = require('./loggingLevelChecker');
const loggerConfigPath = path.join(__dirname,'logger.config');
require('dotenv').config({path:loggerConfigPath})

class Logger{
   constructor(){
    this.outputAsFile = process.env.output_channel.toString().includes('file') || this.outputAsFile || false;
    this.outputAsConsole = process.env.output_channel.toString().includes('console') || outputAsConsole || true;
    this.logfileName = process.env.file_name + new Date().toISOString() + ".log";
    this.logLevel = process.env.logLevel || logLevel || 'error';
    this.greeting = process.env.greeting || '';
    this.mapOfOutputChannels = new Map();

    if(!fs.existsSync(process.env.file_path) && this.outputAsFile){
        this.outputAsFile = false;
    }
    if(this.outputAsFile){    
        const myWritable = fs.createWriteStream(
            path.join(process.env.file_path,this.logfileName));
        this.mapOfOutputChannels.set('file',{writable:myWritable,readable:null});
    }
    if(this.outputAsConsole){
        this.mapOfOutputChannels.set('console',{writable:process.stdout,readable:null})
    }
    this.loggingOutPutIsOn = this.outputAsConsole || this.outputAsFile;
    
    if(this.loggingOutPutIsOn){
        this.mapOfOutputChannels.forEach((value)=>{
            const readableInstance = readable();
            readableInstance._read = ()=>{};
            value['readable'] = readableInstance;
            readableInstance.pipe(value.writable);
        })
    }
   }
    debug(logme){
       return this.log('DEBUG',logme);
    }
    info(logme){
        return this.log('INFO',logme);
    }
    warning(logme){
        return this.log('WARNING',logme);
    }   
    error(logme){
        return this.log('ERROR',logme);
    }
    log(debugLevel,content){
        if(!loggerLevelChecker(debugLevel,this.logLevel)){
            return;
        }
        if (this.loggingOutPutIsOn){
            setTimeout(() => {
                this.mapOfOutputChannels.forEach((value) => {
                    value.readable.push(this.greeting + ' ' + debugLevel + ":" +content+'\n');
                })
            },0)
        }
    }
}

module.exports.Logger = Logger;