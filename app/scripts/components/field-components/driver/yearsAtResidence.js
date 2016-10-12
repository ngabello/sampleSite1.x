/**
 * Created by jholloman on 12/22/2015.
 */
function YearsAtResidence(){
    return {
      bindings: {
        form: '=',
        ngModel: '='
      },
      template: [
      '<div class="form-group"',
        'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.yearSelection_ddl.$invalid]">',
        '<label class="control-label form-left">',
          '<span>Year moved to current residence</span>',
        '</label>',
        '<div ng-messages="$ctrl.form.yearSelection_ddl.$error" ng-if="$ctrl.form.submitted">',
          '<div ng-message="required">Please select year.</div>',
        '</div>',
        '<select id="yearSelection_ddl" class="form-control form-right" name="yearSelection_ddl"',
          'ng-model="$ctrl.ngModel.YearSelected" ng-change="$ctrl.yearChanged()"',
          'ng-options="a.Value as a.Desc for a in $ctrl.yearsAtResidence"',
          'required>',
          '<option value="">Select</option>',
        '</select>',
      '</div>',
      '<div ng-if="$ctrl.withinXYears" class="form-group"',
        'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.monthSelection_ddl.$invalid]">',
        '<label class="control-label form-left">',
          '<span>Month moved to current residence</span>',
        '</label>',
        '<div ng-messages="$ctrl.form.monthSelection_ddl.$error" ng-if="$ctrl.form.submitted">',
          '<div ng-message="required">Please select month.</div>',
        '</div>',
        '<select id="monthSelection_ddl" class="form-control form-right" name="monthSelection_ddl"',
          'ng-model="$ctrl.ngModel.MonthSelected"',
          'ng-options="a.Value as a.Desc for a in $ctrl.monthsAtResidence"',
          'ng-change="$ctrl.monthChanged()"',
          'ng-required="$ctrl.withinXYears">',
          '<option value="">Select</option>',
        '</select>',
      '</div>'
      ].join(''),
      controller: function(){
        this.DateOfResidenceDiff = 4;
        this.yearsAtResidence =  new Date().getDiffYears(this.DateOfResidenceDiff);
        this.monthsAtResidence = new Date().getMonths();
        this.withinXYears = false;

        //Defaults the Residence Years and Residence Months
        if(this.ngModel.DateOfResidence) {
          var m = moment(this.ngModel.DateOfResidence, 'MM-DD-YYYY');
          if (m.isValid()) {
            var year = m.year();
            var month = m.month();
            if (year >= (new Date().getFullYear() - this.DateOfResidenceDiff)) {
              this.withinXYears = true;
              this.ngModel.YearSelected = year;
              this.ngModel.MonthSelected = month;
            } else {
              this.withinXYears = false;
              this.ngModel.YearSelected = 1;
            }
          }
        }
        this.yearChanged = function () {
          if (!this.ngModel.YearSelected) {
            return;
          }
          var minYear = new Date().getFullYear() - this.DateOfResidenceDiff;
          //anything older than 5 years gets a value of 1
          this.withinXYears = this.ngModel.YearSelected >= minYear;

          var currentYear = this.ngModel.YearSelected;
          if (this.ngModel.YearSelected < minYear) {
            currentYear = minYear - 1;
          }
          this.ngModel.DateOfResidence = moment(String.format("01/01/{0}", currentYear), "MM DD YYYY").format("MM-DD-YYYY");
        };

        this.monthChanged = function () {
          if (!this.ngModel.YearSelected || !this.ngModel.MonthSelected) {
            return;
          }
          this.ngModel.DateOfResidence = moment(String.format("{0}/01/{1}", this.ngModel.MonthSelected + 1, this.ngModel.YearSelected), "MM DD YYYY").format("MM-DD-YYYY");
        };
      }
    }
}
