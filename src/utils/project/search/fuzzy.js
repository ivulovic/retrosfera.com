const fuzzy = function (items, key) {
  return function (query) {
    var words = query.toLowerCase().split(' ');

    return items.filter(function (item) {
      var normalizedTerm = item[key].toLowerCase();

      return words.every(function (word) {
        return normalizedTerm.indexOf(word) > -1;
      });
    });
  };
};

export default fuzzy;
