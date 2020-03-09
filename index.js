
var stream = require('stream')
var util = require('util');

var pasteur = require("compt")._;

var Transform = stream.Transform ||
  require('readable-stream').Transform;


function script_concat(command){
    
    
     Transform.call(this, {objectMode: true});
     this._destroyed = false
     this._lastLineData ='';
     this._command = command;
  
}
util.inherits(script_concat, Transform);
script_concat.prototype._destroy = function (chunk, enc, cb) {
   // this.cork();
  
   
  
};
script_concat.prototype.destroy = function (err) {
  // this.cork();
  
  if (this._destroyed) return
  this._destroyed = true
  
    var self = this
    process.nextTick(function() {
      if (err)
        self.emit('error', err)
      self.emit('close')
    })
};

script_concat.prototype._transform = function(chunk, enc, done){

    var data = chunk.toString()

    if (this._lastLineData) data = this._lastLineData + data
    var clean_lines = [];
  
    var end_string = "";    
    end_string = "\n";
    clean_lines.push(data+end_string);
    clean_lines.forEach(this.push.bind(this))
    done()
  
}


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

exports.grass_stream_transform = function(command){
  
    var mindf = new script_concat(command)
    

    return mindf
 
}