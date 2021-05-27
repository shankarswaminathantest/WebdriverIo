const deepmerge=require('deepmerge');
const commonConfig = require('./commonConfig.js');
module.exports=deepmerge(commonConfig,{
    cms: "https://www.versace.com",
    image_comparision_file: "./data/files-image-comparision-and-tabbing/image-comparision.csv",
    tabbing_file: "./data/files-image-comparision-and-tabbing/tabbing-url.csv",
},{ clone: false })
