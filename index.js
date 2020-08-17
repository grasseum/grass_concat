Duplex = require('stream').Duplex,
util = require('util');


var fs = require("fs");
var path = require("path");

var compt = require("compts");

var grasseum_directory =require("grasseum_directory");
var files =require("grasseum_files");
var directory_cmd = grasseum_directory.directory();
var write_file = files.write();

var grasseum_util =require("grasseum_util");
var duplex_stream = grasseum_util.stream().duplex; 

var GrassConcat = function( filename,config ) {




   
   
   
  this.refchunk = null;
  this.filename = filename;
  var refConfig = config ||{};

  this.config = compt._.varExtend({
    "istruncate":false
  },refConfig);




};






GrassConcat.prototype.truncateFile = function() {
  
  write_file.writeStream(this.filename,
    ""     
  );

}

GrassConcat.prototype.write = function(action) {

  var main = this;
  
  if(action.data.isGrasseumPlatform()){
      if(this.config.istruncate){
      
        if (action.data.isFirstPath){
            this.truncateFile();
        }
      }
      
      var data_content = action.data.contents.toString();


      if(/[\;\}\)]$/g.test( data_content )){

        data_content = data_content+"\n";
      }
     
      directory_cmd.createFolderRecursivelyIfNotExist(this.filename)
     
      write_file.writeStream(this.filename,
        data_content,
        {"attr":{flags:"a"}}
      );
      action.push(action.data);
        this.refchunk = action.data;
        action.callback(null,action.data);
          return
      
    }else{
      console.log("This module is not compatible only to grasseum");
      action.callback(null,action.data);
      return
    }  
    
  };
  GrassConcat.prototype.read = function(action) {
    var main = this;

      if( this.refchunk != null){
  
        
      }
      
    
      
     
  };

module.exports = function(filename,config){ 
  
  
  var src_cls =  new  GrassConcat(filename,config); 

  return duplex_stream(null,src_cls) 
}
