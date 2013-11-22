var defaultList =
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
  , defaultTree = [
    {
      '_id': 1,
      'parent': null,
      'children': [
        {
          '_id': 2,
          'parent': 1,
          'children': [
            {
              '_id': 3,
              'parent': 2,
              'children': []
            },
            {
              '_id': 4,
              'parent': 2,
              'children': [
                {
                  '_id': 5,
                  'parent': 4,
                  'children': []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  , twoDeepTree = [
    {
      '_id': 1,
      'parent': null,
      'children': [
        {
          '_id': 2,
          'parent': 1,
          'children': []
        }
      ]
    }
  ]

describe('oakify', function() {

  it('should be a function', function() {

    var oakify = require('..')
    oakify.should.be.type('function')

  })

  it('first parameter should be a Array', function() {

    var oakify = require('..');

    (function(){
      oakify('I aint no Array')
    }).should.throw()

  })

  it('first parameter should be a Array', function() {

    var oakify = require('..');

    (function(){
      oakify('I aint no Array')
    }).should.throw()

  })

  it('Only list and parent are required by default', function() {
    var oakify = require('..')
    oakify([], 1).should.eql([])
  })

  it('Default tree should be created', function() {
    var oakify = require('..')
    oakify(defaultList, null).should.eql(defaultTree)
  })

  it('Default tree should be created without the need for a parent value', function() {
    var oakify = require('..')
    oakify(defaultList).should.eql(defaultTree)
  })

  it('Tree with a depth of two should be created', function() {
    var oakify = require('..')
    oakify(defaultList, null, 2).should.eql(twoDeepTree)
  })

  it('leaf processor should be called', function() {
    var oakify = require('..')
    function leafProcessor(value) {
      value.added = true
      return value
    }
    var tree = oakify(defaultList, null, 0, { leafProcessor: leafProcessor })

    true.should.equal(tree[0].added)
    true.should.equal(tree[0].children[0].added)
    true.should.equal(tree[0].children[0].children[0].added)
  })

})