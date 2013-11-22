module.exports = oakify

var extend = require('lodash.assign')

function leafProcessor(value) {
  return value
}

function oakify(list, parent, maxDepth, options, depth) {

  if (!Array.isArray(list)) {
    throw new Error('list is expected to be an Array')
  }

  if (parent === undefined) {
    parent = null
  }

  var items = []
  maxDepth = maxDepth ? maxDepth : 0

  options = extend({
      idProperty: '_id',
      parentProperty: 'parent',
      leafProcessor: leafProcessor
    }, options)

  list.forEach(function (listItem) {
    var currentDepth = depth ? depth : 1
    if (listItem[options.parentProperty] === parent) {

      var item = options.leafProcessor(listItem)

      item.children = []

      if (maxDepth !== currentDepth) {
        item.children = oakify(list, listItem[options.idProperty], maxDepth, options, currentDepth + 1)
      }

      items.push(item)
    }
  })

  return items
}