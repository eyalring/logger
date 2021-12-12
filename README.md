# logger
in order to use this package you will have to configure the logger.
config file . please fill the method you want to **output_channel** of the logs - file,console or both. 
you can configure the file name prefix by filling the **file_name** attribute. the logger will add the ISO date time string after when opening a new log file containing the current time. 
In order for the logger to save the log in a designated folder you will have to define it using the **file_path** attribute.
feel free to add a grreeting if you want to decorate your log at the begining of a new line .
in order to log the reuqired data you can use the **logLevel** attribute to choose your required logging level . the options are :
debug
info
warning
error

a configuration sample can look like this :

```
#options are console or file , can be both by comma seperated : console,file
output_channel=file
#file name , if output source is chosen as a file
file_name=filePrefix
#log file path ,define where the log should be written
file_path=/Users/eyal/Projects/logger/logs
#opening greeting to start logging with a smile
greeting=handsome
#define the logging level debug/info/warning/
logLevel=warning
```

