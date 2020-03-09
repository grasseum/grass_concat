
exports.grass_stream_config=function(){
    this.setDefaultExtension(["__any__"])
}
exports.grasseum_command = function(option1){
    console.log("grasseum_command")
}
exports.grass_stream_write = function(filename,config){



   return {
       "filename":filename,
       "flags":"a",
      "truncate_content":true
   }
}    