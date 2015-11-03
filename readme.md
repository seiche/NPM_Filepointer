###FilePointer

FilePointer uses an internal pointer and some helper methods to simplify the process of reading binary files as opposed to using Nodejs' buffer class directly.

**Install**  
```
$ npm install filepointer
```  

Version 0.0.1 File pointer is a small wrapper class for reading binary data from files. It's a small side library I've been writing when working with converting binary files to ascii and json formats. It's still in its infancy and subject to changes, so I don't recomend using it for anything too important. But if you want to try it out, feel free to.  

Also the version number on npm will probably change since I need to update the version to publish changes, so please reverence the version number in this readme as a better reference.

**Import**  
```
var FilePointer = require("filepointer");

var fp = new FilePointer("some_file.bin");
```

The FilePointer function can be imported by requiring it. Instances of FilePointer can be initiated by calling the new keyword and passing a filename as an argument. FilePointer simply calls fs.readFileSync internally, so an error will be thrown if the file doesn't exist.


**fp.seek_set**
```
fp.seek_set(offset) 
```

Lorem Ipsum

**fp.seek_cur**
```
fp.seek_cur(offset) 
```

Lorem Ipsum

**fp.seek_end**
```
fp.seek_end(offset) 
```

Lorem Ipsum

**fp.trim**
```
fp.trim() 
```

Lorem Ipsum

**fp.slice**
```
fp.slice() 
```

Lorem Ipsum

**fp.read_word**
```
fp.read_word(offset) 
```

Lorem Ipsum

**fp.read_dword**
```
fp.read_dword(offset) 
```

Lorem Ipsum

**fp.read_single**
```
fp.read_single(offset) 
```

Lorem Ipsum

**fp.read_hex**
```
fp.read_hex(offset) 
```

Lorem Ipsum

**fp.read_str**
```
fp.read_str(offset) 
```

Lorem Ipsum

**fp.read_iff**
```
fp.read_iff(offset) 
```

Lorem Ipsum

**fp.get_pos**
```
fp.get_pos(offset) 
```

Lorem Ipsum

**fp.find**
```
fp.find(offset) 
```

Lorem Ipsum

**fp.read_angle**
```
fp.read_hex(offset) 
```

Lorem Ipsum

