Duplex = require('stream').Duplex,
util = require('util');


var fs = require("fs");
var path = require("path");

var GrassConcat = function( filename ) {
//Readable.call(this, {objectMode: true});


this.data = "";
this.curIndex = 0;
this.boll1 = true;
this.count = 0;
this.refchunk = null;
this.filename = filename;
//this.flags = flags;


Duplex.call(this, {readableObjectMode: true,writableObjectMode: true,objectMode: true});
 
};

util.inherits(GrassConcat, Duplex);


//GrassConcat.prototype._final = function(callback) {
//  console.log("final")
//  callback();
//}
GrassConcat.prototype._write = function(chunk, encoding, callback) {
  //
  var main = this;

    var to_data_string =  chunk//.toString()


  if(/[\;\}\)]$/g.test( chunk.contents )){
    //end_string="\n";
    chunk.contents = chunk.contents+"\n";
  }
    var data = fs.createWriteStream( this.filename, {flags:"a"} );
    data.write( chunk.contents);
    
    this.push(chunk);
    this.refchunk = chunk;
      callback(null,chunk);
   
  
    
  };
  GrassConcat.prototype._read = function(chunk, encoding) {
    var main = this;
    var data = chunk//.toString();
      var to_data_string =  chunk 
      if( this.refchunk != null){
        //console.log(this.refchunk,":rto_data_string",encoding)
       // this.push(this.refchunk);
        
      }
      
    
      
     
  };

module.exports = function(filename){ return new GrassConcat(filename); }
