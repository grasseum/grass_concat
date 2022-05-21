Duplex = require('stream').Duplex,
util = require('util');


var fs = require("fs");
var path = require("path");

var structkit = require("structkit");

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
  
  this.config = structkit.varExtend({
    "istruncate":false,
    "isJsMinify":false
  },refConfig);
  
  this._command = {
    "is_completed_done":false,
    "count":0,
    "count_file_read":0
  };
  
  this.appendContent = [];
  
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
      
      //if(/[\;\}\)]$/g.test( data_content )){
        
      //  data_content = data_content+"\n";
      //}
      if(this.config.isJsMinify){
        
        
        //  if(action.data.isLastPath){
        //?      var uglify_variable= {};
        //?      uglify_variable[action.data.filename]=data_content
        //?      var  uglify_result = UglifyJS.minify(uglify_variable);
        //?     // console.log("error:",data_content_s.error,":error",action.data.filename);
        //?      if(compt._.has(uglify_result.error)){
        //?        console.log("\n\nerror:",uglify_result.error,"\n filename:",action.data.filename);
        //?      }else{
        //?      //  console.log(uglify_result.code);
        //?        data_content = uglify_result.code;
        //?      }
        //  console.log(data_content_s.code);
        //  }
        
      }
      this.appendContent.push(data_content);
      //jsMinify
      
      
      
      
      
      
      directory_cmd.createFolderRecursivelyIfNotExist(this.filename)
      
      write_file.writeStream(this.filename,
        data_content,//this.appendContent.join(""),//data_content,
        {"attr":{flags:"a"}}
        );
        action.push(action.data);
        this.refchunk = action.data;
        return action.callback(null,action.data);
         ;
        
      }else{
        console.log("This module is not compatible only to grasseum");
        return action.callback(null,action.data);
        
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
    