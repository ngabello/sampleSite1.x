/**
 * Created by jholloman on 10/13/2015.
 */
function CompareNumber() {
  return ['$location', function ($location) {
    return {
      template: '',
      link: function (sc, el, at) {
        var agg = $location.search().Agg;

        function formatNumber(input, seperator) {
          if (input) {
            return input.substr(0, 1).concat(seperator, input.substr(1, 3), seperator, input.substr(4, 3), seperator, input.substr(7));
          }
        }

        function applyNumber(number) {
          if(number) {
            var str1 = '<span style="font-size: .8em;"><a ng-click="continueQuote(quoteForm.$valid)" style="cursor: pointer;">Continue online</a> or call&nbsp;</span>' +
              '<span style="font-size: 1.1em;color: #005288;"><a href="tel:' + number + '">' + formatNumber(number, '-') + '</a></span>';
            var str2 = '<a href="tel:' + number + '" style="color: white;font-style: italic;font-size: 25px;text-decoration: none;float: right;"><strong>' + formatNumber(number, '.') + '</strong></a></div>';
            $('#main-number').html(str2);
            return el.html(str1);
          }

        }

        if (agg) {
          switch (agg.toLowerCase()) {
            case 'g':
              applyNumber('18449375354');
              break;
            case 'c':
              applyNumber('18773218860');
              break;
          }
        }
      }
    }
  }]
}
