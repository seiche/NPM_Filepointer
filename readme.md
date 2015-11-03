###FilePointer

FilePointer uses an internal pointer and some helper methods to simplify the process of reading binary files as opposed to using Nodejs' buffer class directly.

**Install**  
```
$ npm install filepointer
```  

**Import**  
```
var FilePointer = require("filepointer");

var fp = new FilePointer("some_file.bin");
```

**Constants**
```
fp.SEEK_SET // 0
fp.SEEK_CUR // 1
fp.SEEK_END // 2
```
