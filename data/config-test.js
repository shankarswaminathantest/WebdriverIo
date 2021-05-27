const deepmerge=require('deepmerge');
const commonConfig = require('./commonConfig.js');
module.exports=deepmerge(commonConfig,{
    cms: "https://wwwtest.versace.com/",
    image_comparision_file: "./data/files-image-comparision-and-tabbing/image-comparision-qt.csv",
    tabbing_file: "./data/files-image-comparision-and-tabbing/tabbing-url-qt.csv",
   },{ clone: false })
