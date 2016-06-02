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

module.exports = class {

	constructor(file, is_big_endian) {
		this.fp = 0;

		if (Buffer.isBuffer(file)) {
			this.buffer = file;
		} else {
			this.buffer = fs.readFileSync(file);
		}

		this.is_big_endian = Boolean(is_big_endian);
		this.len = this.buffer.length;
	}

	/**
	 * Seek Functions
	 **/

	seek_set(pos) {
		if (pos !== parseInt(pos, 10)) {
			throw new Error("Must provide an integer value to seek_set");
		}

		this.fp = pos;
	}

	seekSet(pos){
		this.seek_set(pos);
	}

	seek_cur(pos) {
		if (pos !== parseInt(pos, 10)) {
			throw new Error("Must provide an integer value to seek_cur");
		}

		this.fp += pos;
	}

	seekCur(pos){
		this.seek_cur(pos);
	}

	seek_end(pos) {
		if (pos !== parseInt(pos, 10)) {
			throw new Error("Must provide an integer value to seek_end");
		}

		this.fp = this.buffer.length + pos;
	}

	seekEnd(pos){
		this.seek_end(pos);
	}

	seek_next(do_seek) {
		while (!this.buffer.readUInt8(this.fp)) {
			this.fp += 1;
			if (this.fp === this.buffer.length - 1) {
				break;
			}
		}
	}

	/**
	 * Buffer functions
	 **/

	trim() {
		this.buffer = this.buffer.slice(this.fp);
		this.fp = 0;
	}

	copy(len) {
		var tmp = new Buffer(len);

		this.buffer.copy(tmp, 0, this.fp, this.fp + len);
		this.fp += len;

		return tmp;
	}

	copy_abs(start, end) {
		var len, tmp;

		len = end - start;

		tmp = new Buffer(len);
		this.buffer.copy(tmp, 0, start, end);
		return tmp;
	}

	is_zero() {
		if (this.fp >= this.buffer.length - 4) {
			return false;
		}

		var integer;
		integer = this.buffer.readUInt32LE(this.fp);
		return Boolean(integer);
	}

	get_pos() {
		return this.fp;
	}

	tell() {
		return this.fp;
	}

	get_len() {
		return this.buffer.length;
	}

	len() {
		return this.buffer.length;
	}

	/**
	 * Read Functions
	 **/

	// reads unsigned char (1 bytes)
	read_byte() {
		var integer;
		integer = this.buffer.readUInt8(this.fp);
		this.fp += 1;
		return integer;
	}

	//@alias - read_byte (1 bytes)
	readByte() {
		return this.read_byte();
	}

	// reads unsigned short (2 bytes)
	read_word() {
		var integer;

		if (!this.is_big_endian) {
			integer = this.buffer.readUInt16LE(this.fp);
		} else {
			integer = this.buffer.readUInt16BE(this.fp);
		}

		this.fp += 2;
		return integer;
	}

	//@alias - read_word (2 bytes)
	read_ushort() {
		return this.read_word();
	}

	//@alias - read_word (2 bytes)
	readUShort() {
		return this.read_word();
	}

	// reads signed short (2 bytes)
	read_short() {
		var integer;

		if (!this.is_big_endian) {
			integer = this.buffer.readInt16LE(this.fp);
		} else {
			integer = this.buffer.readInt16BE(this.fp);
		}

		this.fp += 2;
		return integer;
	}

	//@alias - read_short (2 bytes)
	readShort() {
		return this.read_short()
	}

	// reads unsigned int (4 bytes)
	read_dword() {
		var integer;

		if (!this.is_big_endian) {
			integer = this.buffer.readUInt32LE(this.fp);
		} else {
			integer = this.buffer.readUInt32BE(this.fp);
		}

		this.fp += 4;
		return integer;
	}

	// reads unsigned int (4 bytes)
	read_uint() {
		return this.read_dword();
	}

	// reads unsigned int (4 bytes)
	readUInt() {
		return this.read_dword();
	}

	// reads signed int (4 bytes)
	read_int() {
		var integer;

		if (!this.is_big_endian) {
			integer = this.buffer.readInt32LE(this.fp);
		} else {
			integer = this.buffer.readInt32BE(this.fp);
		}

		this.fp += 4;
		return integer;
	}

	//@alias - read_int (4 bytes)
	readInt() {
		return this.read_int();
	}

	// reads single point float (4 bytes)
	read_single() {
		var float;

		if (!this.is_big_endian) {
			float = this.buffer.readFloatLE(this.fp);
		} else {
			float = this.buffer.readFloatBE(this.fp);
		}

		this.fp += 4;
		return float;
	}

	//@alias - read_single (4 bytes)
	read_float() {
		return this.read_single();
	}

	//@alias - read_single (4 bytes)
	readFloat() {
		return this.read_single();
	}

	//reads int as angle value (4 bytes)
	read_angle(degrees) {
		var rawInt = this.read_int();
		return rawInt * 360 / 0xFFFF;
	}

	//@alias - read_angle (4 bytes)
	readAngle() {
		return this.read_Angle();
	}

	//reads int as radian value (4 bytes)
	read_rad() {
		return this.read_angle() * Math.PI / 180;
	}

	//@alias - read_rad (4 bytes)
	readRad() {
		return this.read_rad();
	}

	//reads three angles (x,y,z) (12 bytes)
	readAng3() {
		return [
			this.read_angle().toFixed(2),
			this.read_angle().toFixed(2),
			this.read_angle().toFixed(2)
		];
	}

	//reads three radians (x,y,z) (12 bytes)
	readRot3() {
		return [
			this.read_rad(),
			this.read_rad(),
			this.read_rad()
		];
	}

	//reads three floats (x,y,z) (12 bytes)
	readVec3() {
		return [
			this.read_single(),
			this.read_single(),
			this.read_single()
		];
	}


	/**
	 * String Functions
	 **/

	read_str(len) {
		var str, null_index;

		if (typeof len == 'undefined') {
			var pos = this.fp;

			while(this.buffer[this.fp]){
				this.fp++;
			}

			str = this.buffer.toString("ascii", pos, this.fp);
		} else {
			str = this.buffer.toString("ascii", this.fp, this.fp + len);
			this.fp += len;
		}

		null_index = str.indexOf("\0");
		if (null_index !== -1) {
			str = str.substr(0, null_index);
		}

		return str;
	}

	readString(len) {
		return this.read_str(len);
	}

	readStr(len) {
		return this.read_str(len);
	}

	read_iff() {
		var str, null_index;

		str = this.buffer.toString("ascii", this.fp, this.fp + 4);
		this.fp += 4;

		null_index = str.indexOf("\0");
		if (null_index !== -1) {
			str = str.substr(0, null_index);
		}

		return str;
	}

	readIff(){
		return this.read_iff();
	}

	find(match) {
		var str, search_len;

		search_len = this.buffer.length - match.length;

		for (var pos = this.fp; pos < search_len; pos++) {
			str = this.buffer.toString("ascii", pos, pos + match.length);
			if (str.localeCompare(match) === 0) {
				this.fp = pos;
				return true;
			}
		}

		return false;
	}
	
	read_color(isSpecular){
		var a, r, g, b;

		b = this.readByte() / 255;
        g = this.readByte() / 255;
        r = this.readByte() / 255;

		if(!isSpecular){
            a = this.readByte() / 255;
		}else{
            a = this.readByte() & 0x1F;
		}

        return [r, g, b, a];
	}

	readColor(isSpecular){
		return this.read_color(isSpecular);
	}
}
