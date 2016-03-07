###FilePointer

FilePointer uses an internal pointer and some helper methods to simplify the 
process of reading binary files as opposed to using Nodejs' buffer class 
directly. It has been written to mimic the syntax style of C's FILE pointer.

Mechanically there isn't a lot going on this library. Each instance of a
FilePointer class has three attributes, an interger file pointer, a buffer, 
and a boolean indicating if the file is big endian or not.

When an instance is created the file pointer is initiated to 0, and when a 
value is read the pointer is advanced by that many bytes. As the fs buffer
object generally requires you to specify the offset it allows for files to be
parsed with the file pointer to be expressed internally instead of having to
manage the current location inside your program.

**Install**  
```
$ npm install filepointer
```  

**Import**  
```
var fs = require("fs");
var FilePointer = require("filepointer");

var fp = new FilePointer("some_file.bin");
//alternatively
var buffer = fs.readFileSync("some_file.bin")
var fp = new FilePointer(buffer);
```

The FilePointer function can be imported by requiring it. Instances of 
FilePointer can be initiated by calling the new keyword and passing a filename 
as an argument. FilePointer simply calls fs.readFileSync internally, so an 
error will be thrown if the file doesn't exist.

Alternatively a new FilePointer instance can be created directly with a buffer 
object, as there may be instances where you want to read data from an 
internally created buffer. The functionality works exactly the same as passing 
in a filename. The pointer object holds the buffer internally and starts the 
filepointer at zero.

###Seek Functions

**fp.seek_set**
```
fp.seek_set(offset)
```

Seeks to an offset from the start of the file. If the seek offset is not a 
valid integer valid, this function will throw an error.

**fp.seek_cur**
```
fp.seek_cur(offset)
```

Seeks to an offset from the current file pointer position. If the seek offset 
is not a valid integer valid, this function will throw an error.

**fp.seek_end**
```
fp.seek_end(offset)
```

Seeks to an offset from the end of end of the file. If the seek offset is not 
a valid integer valid, this function will throw an error.

###Buffer Functions

**fp.trim**
```
fp.trim()
```

Trims the internal buffer to the location of the current file pointer, and 
then sets the value of the current pointer to zero. Useful when offsets inside 
a file do not account for the position in which the offset is declared.

**fp.copy**
```
fp.copy(length, [seek])
```

Copies and returns a raw buffer object from the inner buffer starting from the
current location of the file pointer until the length specified. Seek is an 
optional parameter which advances the inner file pointer by the length 
specified (false by default).

**fp.copy_abs**
```
fp.copy_abs(start, end)
```

Copies and returns a raw buffer object from the absolute start location 
provided until the absolute end location provided. As the function itself is 
absolute, the inner file pointer remains unchanged.

###Debug Functions

**fp.is_zero**
```
fp.is_zero()
```

This function is used for testing if a dword in a file is set to zero. This 
function checks to see if the current file pointer has at least four bytes
to the end of the buffer and returns false if not.

This function then reads a dword and returns a boolean if the dword is equal
to zero and false otherwise. This function is intended for debugging and does
not advance the inner file pointer.

**fp.get_pos**
```
fp.get_pos([debug])
fp.tell([debug]) //alias
```

Gets the current position of the internal file pointer. By default it returns 
a base 10 integer for use in the program. If the debug boolean is set, the 
function returns the position as a base 16 string.

**fp.get_len()**

Returns the length of the current internal buffer.

###Read Functions

**fp.read_byte**
```
fp.read_byte()
```

This function reads the next byte in the internal buffer as an unsigned char. 
The internal file pointer advances by one byte.

**fp.read_word**
```
fp.read_word()
fp.read_ushort() //alias
```

This function reads the next two bytes in the file as an unsigned short. The 
internal file pointer advances by two bytes.

**fp.read_short**
```
fp.read_short()
```

This function reads the next two bytes in the file as a signed short. The 
internal file pointer advances by two bytes.

**fp.read_dword**
```
fp.read_dword()
fp.read_uint()
```

This function reads the next four bytes in the file as an unsigned integer. The
internal file pointer advances by four bytes.

**fp.read_int**
```
fp.read_int()
```

This function reads the next four bytes in the file as a signed integer. The
internal file pointer advances by four bytes.


**fp.read_single**
```
fp.read_single()
```

This function reads the next four bytes in the file as a float. The internal 
file pointer advances by four bytes.

**fp.read_angle**
```
fp.read_angle([degrees])
```
This function reads four bytes as a signed integer and converts it to degrees 
where 0x0000 corresponds to zero and 0xFFFF corresponds to 360 degrees. 
This function advances the internal file pointer by four bytes.

###String Functions

**fp.read_str**
```
fp.read_str(len)
```

This function reads a string as ascii characters form the current file location 
for the length of the value provided. The function truncates the string to the 
first null character in the string. The internal pointer advances by the value 
of the argument provided.

**fp.read_iff**
```
fp.read_iff() //alias
```

This function is the same thing as fp.read_str(4). It reads four bytes as a 
string and returns them. This function advances the internal file pointer by 
four bytes.

**fp.find**
```
fp.find(str)
```
Searches for an ASCII string inside of a file (generally an interchange file 
format header) from the current file pointer location. Returns true if the
string is found and false otherwise. Internal pointer location is set to the 
found location when true.

