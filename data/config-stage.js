const deepmerge=require('deepmerge');
const commonConfig = require('./commonConfig.js');
module.exports=deepmerge(commonConfig,{
    userName: "sugariotestuser1@gmail.com",
    password: "Test!234"
},{ clone: false })
