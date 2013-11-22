module.exports = oakify

var _ = require('lodash')

function leafProcessor(value) {
  return value
}

/*
 * Recursively gets the visible sections for a given parent.
 * Parent is allowed to be null, in which case the
 * top level sections will be retrieved (and their
 * children descended). Returns a nested object that
 * is useful for simple iteration, for instance in a
 * template that generates navigation markup.
 */
function oakify(list, parent, maxDepth, options, depth) {

  if (!Array.isArray(list)) {
    throw new Error('list is expected to be an Array')
  }

  var items = []
  maxDepth = maxDepth ? maxDepth : 0

  options = _.extend({
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