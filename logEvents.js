const {format}=require('date-fns');
const {v4: uuid} = require('uuid');//importing  v4 as uuid

const fs=require('fs');
const fsPromises = require('fs').promises;
const path=require('path');

const logEvents=async(message) => {
    const dateTime=`${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`;
    const logItem=`${dateTime}\t${uuid()}\t${message}`;
    console.log(logItem);
    try{
        await fsPromises.appendFile(path.join(__dirname,'logs','eventLog.txt'),logItem);
    }catch(err){
        console.err(err);
    }
}

module.export=logEvents;