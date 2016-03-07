"use strict";

/*--------------------------------------------------------------------------
  FilePointer a small wrapper class for reading binary files
  Copyright (C) 2015,2016  Benjamin Collins

  This utility is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 2 of the License, or
  (at your option) any later version.

  This utility is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this utility.  If not, see <http://www.gnu.org/licenses/>.
--------------------------------------------------------------------------*/

var fs = require("fs");

module.exports = class  {

	constructor(file, is_big_endian){
		this.fp = 0;

		if(Buffer.isBuffer(file)){
			this.buffer = file;
		}else{
			this.buffer = fs.readFileSync(file);
		}

		this.is_big_endian = Boolean(is_big_endian);
	}
	
	/**
	 * Seek Functions
	 **/

	seek_set(pos){
		if(pos === parseInt(pos, 10)){
			throw new Error("Must provide an integer value to seek_set");
		}

		this.fp = pos;
	}

	seek_cur(pos){
		if(pos === parseInt(pos, 10)){
			throw new Error("Must provide an integer value to seek_cur");
		}

		this.fp += pos;
	}

	seek_end(pos){
		if(pos === parseInt(pos, 10)){
			throw new Error("Must provide an integer value to seek_end");
		}

		this.fp = this.buffer.length + pos;
	}

	/**
	 * Buffer functions
	 **/

	trim(){
		this.buffer = this.buffer.slice(this.fp);
		this.fp = 0;
	}

	copy(len, seek){
		var tmp = new Buffer(len);

		this.buffer.copy(tmp,0, this.fp, this.fp + len);
		if(seek){
			this.fp += len;
		}

		return tmp;
	}

	copy_abs(start, end){
		var len, tmp;

		len = end - start;

		tmp = new Buffer(len);
		this.buffer.copy(tmp,0, start, end);
		return tmp;
	}

	is_zero(){
		if(this.fp >= this.buffer.length -4){
			return false;
		}

		var integer;
		integer = this.buffer.readUInt32LE(this.fp);
		return Boolean(integer);
	}

	get_pos(debug){
		if(!debug){
			return this.fp;
		}else{
			return this.fp.toString(16);
		}
	}

	tell(debug){
		if(!debug){
			return this.fp;
		}else{
			return this.fp.toString(16);
		}
	}

	get_len(){
		return this.buffer.length;
	}

	/**
	 * Read Functions
	 **/

	 read_byte(){
	 	var integer;
		integer = this.buffer.readUInt8(this.fp);
		this.fp += 1;
		return integer;
	 }

	 read_word(){
		var integer;

		if(!this.is_big_endian){
			integer = this.buffer.readUInt16LE(this.fp);
		}else{
			integer = this.buffer.readUInt16BE(this.fp);
		}

		this.fp += 2;
		return integer;
	 }

	 read_ushort(){
		var integer;

		if(!this.is_big_endian){
			integer = this.buffer.readUInt16LE(this.fp);
		}else{
			integer = this.buffer.readUInt16BE(this.fp);
		}

		this.fp += 2;
		return integer;
	 }

	 read_short(){
		var integer;

		if(!this.is_big_endian){
			integer = this.buffer.readInt16LE(this.fp);
		}else{
			integer = this.buffer.readInt16BE(this.fp);
		}

		this.fp += 2;
		return integer;
	 }
	
	 read_dword(){
		var integer;

		if(!this.is_big_endian){
			integer = this.buffer.readUInt32LE(this.fp);
		}else{
			integer = this.buffer.readUInt32BE(this.fp);
		}

		this.fp += 4;
		return integer;
	 }

	 read_uint(){
		var integer;

		if(!this.is_big_endian){
			integer = this.buffer.readUInt32LE(this.fp);
		}else{
			integer = this.buffer.readUInt32BE(this.fp);
		}

		this.fp += 4;
		return integer;
	 }

	 read_angle(degrees){
		var integer;

		if(!this.is_big_endian){
			integer = this.buffer.readUInt32LE(this.fp);
		}else{
			integer = this.buffer.readUInt32BE(this.fp);
		}

		this.fp += 4;
		return integer;
	 }

	 read_int(){
		var integer;

		if(!this.is_big_endian){
			integer = this.buffer.readInt32LE(this.fp);
		}else{
			integer = this.buffer.readInt32BE(this.fp);
		}

		this.fp += 4;
		return integer;
	 }

	 read_single(){
		var float;

		if(!this.is_big_endian){
			float = this.buffer.readFloatLE(this.fp);
		}else{
			float = this.buffer.readFloatBE(this.fp);
		}

		this.fp += 4;
		return float;
	 }

	/**
	* String Functions
	**/

	read_str(len){
		var str, null_index;

		str = this.buffer.toString("ascii", this.fp, this.fp + len);
		this.fp += len;
		
		null_index = str.indexOf("\0");
		if(null_index !== -1){
			str = str.substr(0, null_index);
		}

		return str;
	}

	read_iff(){
		var str, null_index;

		str = this.buffer.toString("ascii", this.fp, this.fp + 4);
		this.fp += 4;
		
		null_index = str.indexOf("\0");
		if(null_index !== -1){
			str = str.substr(0, null_index);
		}

		return str;
	}

	find(match){
		var str, search_len;
		
		search_len= this.buffer.length - match.length;

		for(var pos = this.fp; pos < search_len; pos++){
			str = this.buffer.toString("ascii", pos, pos + match.length);
			if(str.localeCompare(match) === 0){
				this.fp = pos;
				return true;
			}
		}

		return false;
	}

}

