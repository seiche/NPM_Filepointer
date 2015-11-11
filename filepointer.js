var fs = require("fs");

module.exports = function(filename){
  this.fp = 0;
  this.buffer = fs.readFileSync(filename);

  this.seek_set = function(offset){
    this.fp = 0;
    this.fp += offset;
  }
  
  this.seek_cur = function(offset){
    this.fp += offset;
  }
  
  this.seek_end = function(offset){
    this.fp = this.buffer.length;
    this.fp += offset;
  }

  this.trim = function(){
    this.buffer = this.buffer.slice(this.fp);
    this.fp = 0;
  }

  this.slice = function(start, end){
    var tmp = new this.buffer(end - start);
    this.buffer.copy(tmp, 0, start, end);
    return tmp;
  }

  this.read_word = function(){
    var integer = this.buffer.readUInt16LE(this.fp);
    this.fp += 2;
    return integer;
  }

  this.read_dword = function(){
    var integer = this.buffer.readUInt32LE(this.fp);
    this.fp += 4;
    return integer;
  }

  this.read_single = function(){
    var double = this.buffer.readFloatLE(this.fp);
    this.fp += 4;
    double = double.toFixed(6);
    double = parseFloat(double);
    return double;
  }

  this.read_hex = function(len){
    var str = this.buffer.toString("hex", this.fp, this.fp + len);
    this.fp += len;
    return str;
  }

  this.read_str = function(len){
    var str = this.buffer.toString("ascii", this.fp, this.fp + len);
    this.fp += len;
    str = str.replace(/\0/g, "");
    return str;
  }

  this.read_iff = function(){
    var str = this.buffer.toString("ascii", this.fp, this.fp + 4);
    str = str.replace(/\0/g, "");
    this.fp += 4;
    return str;
  }

  this.get_pos = function(){
    return this.fp;
  }

  this.find = function(match, from_start){
    var pos;
    if(from_start){
     pos = 0;
   }else{
     pos = this.fp;
   }

    for(pos; pos < this.buffer.length - 4; pos += 4){
      var str = this.buffer.toString("ascii", pos, pos + 4);
      str = str.replace(/\0/g, "");

      if(str == match){
        this.fp = pos;
        return true;
      }
    }

    return false;
  }

  this.read_angle = function(){
    var angle = this.buffer.readInt32LE(this.fp);
    this.fp += 4;
    var angle = angle / 0xFFFF;
    angle = parseInt(360 * angle);
    return angle;
  }

}
