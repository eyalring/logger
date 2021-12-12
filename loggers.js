const configuration = require('dotenv').config({ path: './logger.config' })
const fs = require('fs');
const readable = require('stream').Readable;
const path = require('path');
const loggerLevelChecker = require('./loggingLevelChecker');

class Logger{
   constructor(outputAsFile = false ,outputAsConsole = false,logLevel = 'error'){
    this.outputAsFile = process.env.output_channel.toString().includes('file') || outputAsFile;
    this.outputAsConsole = process.env.output_channel.toString().includes('console') || outputAsConsole;
    this.logfileName = process.env.file_name + new Date().toISOString() + ".log";
    this.logLevel = process.env.logLevel || logLevel;
    this.greeting = process.env.greeting || '';

    if(!fs.existsSync(process.env.file_path) && this.outputAsFile){
        this.outputAsFile = false;
    }
    
    if(this.outputAsFile){
        this.fileWriter = fs.createWriteStream(
            path.join(process.env.file_path,this.logfileName));
    }
    this.shouldLog = this.outputAsConsole || this.outputAsFile;
    
    if(this.shouldLog){
        if(this.outputAsFile && this.outputAsConsole){
            this.myReadableForConsole = readable();
            this.myReadableForFile = readable();
            this.myReadableForConsole._read = () =>{};
            this.myReadableForFile._read = () =>{};

            this.myReadableForConsole.pipe(process.stdout);
            this.myReadableForFile.pipe(this.fileWriter);
         }else if(this.outputAsFile){
            this.myReadableForFile = readable();
            this.myReadableForFile._read = () =>{};

             this.myReadableForFile.pipe(this.fileWriter);
         }else if(this.outputAsConsole){
            this.myReadableForConsole = readable();
            this.myReadableForConsole._read = () =>{};

             this.myReadableForConsole.pipe(process.stdout);
         }
    }
    
    
   }
    debug(logme){
        if(loggerLevelChecker('DEBUG',this.logLevel)){this.log('DEBUG:',logme)}
    }
    info(logmenfo){
        if(loggerLevelChecker('INFO',this.logLevel)){this.log('INFO:',logme)}
    }
    warning(logme){
        if(loggerLevelChecker('WARNING',this.logLevel)){this.log('WARNING:',logme)}
    }   
    error(logme){
        if(loggerLevelChecker('ERROR',this.logLevel)){this.log('ERROR:',logme)}
    }
    log(debugLevel,content){
        if (this.shouldLog){
            setTimeout(() => {
                if(this.outputAsFile){
                    this.myReadableForFile.push(this.greeting + ' ' + debugLevel +content+'\n');
                }
                
                if(this.outputAsConsole){
                    this.myReadableForConsole.push(debugLevel +content+'\n');
                }
                },0)
        }
    }
}

module.exports.Logger = Logger;