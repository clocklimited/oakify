# oakify

[![Greenkeeper badge](https://badges.greenkeeper.io/clocklimited/oakify.svg)](https://greenkeeper.io/)

Take a list of items related by a parent property and make a tree.

## Installation

    npm install --save oakify

## Usage

```js

var oakify = require('..')
  , list =
  [ { _id: 1
    , parent: null }
  , { _id: 2
    , parent: 1 }
  , { _id: 3
    , parent: 2 }
  , { _id: 4
    , parent: 2 }
  , { _id: 5
    , parent: 4 }
  ]
  , tree = oakify(list)


  /*
  Output
  [
      {
          "_id": 1,
          "parent": null,
          "children": [
              {
                  "_id": 2,
                  "parent": 1,
                  "children": [
                      {
                          "_id": 3,
                          "parent": 2,
                          "children": []
                      },
                      {
                          "_id": 4,
                          "parent": 2,
                          "children": [
                              {
                                  "_id": 5,
                                  "parent": 4,
                                  "children": []
                              }
                          ]
                      }
                  ]
              }
          ]
      }
  ]
  */
```

## Credits
Built by developers at [Clock](http://clock.co.uk).

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
