/**
 * Created by gabello on 10/13/2015.
 */
Date.prototype.isLeapYear = function() {
  var year = this.getFullYear();
  if((year & 3) != 0) return false;
  return ((year % 100) != 0 || (year % 400) == 0);
};

// Get Day of Year
Date.prototype.getDOY = function() {
  var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  var mn = this.getMonth();
  var dn = this.getDate();
  var dayOfYear = dayCount[mn] + dn;
  if(mn > 1 && this.isLeapYear()) dayOfYear++;
  return dayOfYear;
};

Date.prototype.getMonths = function() {
  var count = 0;
  var months = [];
  while (count < 12) months.push({Value: count, Desc: moment(new Date()).month(count++).format("MMMM")});
  return months;
};

Date.prototype.getDiffYears = function (yearDiff) {
  var years = [];
  var currentYear = new Date().getFullYear();
  var minYear = new Date().getFullYear() - yearDiff;

  for (var i = currentYear; i >= minYear; i--) {
    years.push({Value: i, Desc: i})
  }
  years.push({Value: 1, Desc: String.format("Prior to {0}", currentYear - yearDiff)});

  return years;
};
