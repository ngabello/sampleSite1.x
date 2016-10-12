/**
 * Created by jholloman on 6/4/2015.
 */
'use strict';
function lienholderTypeAheadEdit(){
  return function() {
    return function (list, searchText) {
      var filtered = [
        {Name: 'Other'},
        {Name: 'I don\'t know but can provide later'}
      ];
      searchText = searchText.toLowerCase();
      angular.forEach(list, function (item) {
        if (item.Name.toLowerCase().indexOf(searchText) !== -1)
          filtered.push(item);
      });
      return filtered;
    };
  }
}
