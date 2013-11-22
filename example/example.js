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

console.log(JSON.stringify(tree))

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