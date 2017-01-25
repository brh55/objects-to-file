# objects-to-file [![Travis](https://img.shields.io/travis/brh55/objects-to-file.svg?style=flat-square)](https://travis-ci.org/brh55/objects-to-file) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)

> Simple node writer module to output a file from an array of objects with best effort key mapping
>
> **objectsToFile([{}, {}, {}]) => :page_facing_up:**

## Install

`$ npm install --save objects-to-file` **OR** `$ yarn add objects-to-file`

## Usage
### Basic
```javascript
const fs = require('fs');
const objectsToFile = require('objects-to-file');

const cats = [
    { name: 'Bubbles', breed: 'Persian', age: '24', color: 'honey-brown' },
    { name: 'Garfield', breed: 'Tabby', age: '33', color: 'orange with stripes' }
];
objectsToFile(cats, './cat_data.txt', { header: true })
    .then(file => console.log(`data: ${file}`)
    .catch(console.log);

// ./cat_data.txt:
// name,breed,age,color
// Bubbles,Persian,24,honey-brown
// Garfield,Tabby,33,orange with stripes
```

### Advance
```javascript
const fs = require('fs');
const objectsToFile = require('objects-to-file');

const dogData = [
    './data/dogs/german_sheperd',
    './data/dogs/pug',
    './data/dogs/beagle'
];

let dogOutput = dogsPaths
                    .map((filePath) => require(dogPaths))
                    .map((dog, index) => objectsToFile(dog, `./output/DATA_${index}.csv`);

Promise
    .all(dogOutput)
    .then((files) => {
        const paths = files.toString().replace(/,/g, ', ');
        console.log(`Files stored at: ${paths}`);
        // Files stored at: ./output/DATA_0.csv,  ./output/DATA_1.csv, ./output/DATA_2.csv
     })
     .catch(console.log);
```

## API
### objectsToFile(data, outputPath[, options])
Creates a file based on an array of objects. Unless specified, it will use the first object as a mapping for subsequent objects.

*Returns {Promise}, when resolved returns the file location path*

#### **data** | [`<array>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Indexed_collections_Arrays_and_typed_Arrays)
The input array of objects.

#### **outputPath** | [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
The output file location

#### **options** | [`<object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Normal_objects_and_functions)
##### options.keys | [`<array>[<string> | <int>]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Indexed_collections_Arrays_and_typed_Arrays)
A list of keys to map and dictate the order of the value output. Any non-existent fields will be omitted.

##### options.header | [`<bool>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)
Set `true` to print the key on the first line of the file. `Note: this will not work with options.raw = true`

##### options.count | [`<int>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
Number of desired objects to be written.

##### options.delimiter | [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
The delimiter to be used to seperate values. `Default: ","`

##### options.EOL | [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
The End of Line character to be used. `Default: "\n"`

##### options.encoding | [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
The encoding to be used for the output file. `Default: "utf8"`

##### options.raw | [`<bool>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)
Set `true` to print all the values within the objects, ignoring keys or first object key mapping.

##### options.encoding | [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
The encoding to be used for the output file. `Default: "utf8"`

## Related
:repeat: [file-line-parse](https://github.com/brh55/file-line-parse) - Parse a file, line by line, to an array of objects.

## License
MIT
