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


**Constants**
```
fp.SEEK_SET // 0
fp.SEEK_CUR // 1
fp.SEEK_END // 2
```

FilePointer uses constants similar to C language's FILE pointer interface. SEEK_SET is used when seeking from the start of the file, SEEK_CUR is used when seeking from the current position and SEEK_END is used when seeking from the end of the file.

