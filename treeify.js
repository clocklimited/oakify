module.exports = oakify

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
function oakify(parent, list, maxDepth, depth, options) {

  var items = []
  maxDepth = maxDepth ? maxDepth : 0

  options = {
    idProperty: options.idProperty || '_id',
    parentProperty: options.parentProperty || 'parent',
    leafProcessor: options.leafProcessor || leafProcessor
  }

  list.forEach(function (listItem) {
    var currentDepth = depth ? depth : 1
    if (listItem[options.parentProperty] === parent) {

      var item = options.leafProcess(listItem)

      item.subItems = []

      if (maxDepth !== currentDepth) {
        item.subItems = oakify(listItem[options.idProperty], list, maxDepth, currentDepth + 1)
      }

      items.push(item)
    }
  })

  return items
}