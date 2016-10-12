/**
 * Created by jholloman on 12/22/2015.
 */
function Military() {
  return {
    bindings: {
      form: '=',
      ngModel: '='
    },
    template: [
      //Military Branch
      '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && ($ctrl.ngModel.EmploymentStatus == \'ServeMilitary\' ||',
      ' $ctrl.ngModel.EmploymentStatus == \'RetiredMilitary\') && form.militaryBranch.$invalid]"',
      ' ng-if="$ctrl.ngModel.EmploymentStatus == \'ServeMilitary\' || $ctrl.ngModel.EmploymentStatus == \'RetiredMilitary\'">',
      '<label class="control-label form-left"><span>Branch</span></label>',
      '<div ng-messages="$ctrl.form.militaryBranch.$error"',
      'ng-if="$ctrl.form.submitted && ($ctrl.ngModel.EmploymentStatus == \'ServeMilitary\' || $ctrl.ngModel.EmploymentStatus == \'RetiredMilitary\')">',
      '<div ng-message="required">Please choose a military branch.</div>',
      '</div>',
      '<select id="militaryBranch" class="form-control form-right" ng-model="$ctrl.ngModel.MilitaryBranch" name="militaryBranch" ng-change="$ctrl.resolveRank()"',
      'ng-options="a.Value as a.Desc for a in $ctrl.militaryBranches" ng-required="$ctrl.ngModel.EmploymentStatus == \'ServeMilitary\'|| $ctrl.ngModel.EmploymentStatus == \'RetiredMilitary\'">',
      '<option value="">-- Select --</option>',
      '</select>',
      '</div>',
      // Military Rank
      '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && ($ctrl.ngModel.EmploymentStatus == \'ServeMilitary\' ||',
      '$ctrl.ngModel.EmploymentStatus == \'RetiredMilitary\') && $ctrl.ngModel.MilitaryBranch && form.militaryStatus.$invalid]"',
      'ng-if="$ctrl.ngModel.MilitaryBranch && ($ctrl.ngModel.EmploymentStatus == \'ServeMilitary\' || $ctrl.ngModel.EmploymentStatus == \'RetiredMilitary\')">',
      '<label class="control-label form-left">Rank</label>',
      '<div ng-messages="$ctrl.form.militaryStatus.$error" ng-if="$ctrl.form.submitted && ',
      '($ctrl.ngModel.EmploymentStatus == \'ServeMilitary\' || $ctrl.ngModel.EmploymentStatus == \'RetiredMilitary\')">',
      '<div ng-message="required">Please choose a military rank.</div>',
      '</div>',
      '<select id="militaryStatus" class="form-control form-right" ng-model="$ctrl.ngModel.MilitaryStatus" name="militaryStatus"',
      'ng-options="b.Value as b.Desc for b in $ctrl.militaryServiceTypes" ng-required="$ctrl.ngModel.MilitaryBranch && ($ctrl.ngModel.EmploymentStatus == \'ServeMilitary\'',
      '|| $ctrl.ngModel.EmploymentStatus == \'RetiredMilitary\')">',
      '<option value="">-- Select --</option>',
      '</select>',
      '</div>'].join(''),
    controller: ['LookupDataService', function (lookupDataService) {

      this.militaryBranches = lookupDataService.getMilitaryBranchLookups();

      //Pre fill the Military Service Types
      if (this.ngModel.MilitaryBranch) {
        this.militaryServiceTypes = lookupDataService.getMilitaryServiceTypeLookups(this.ngModel.MilitaryBranch);
      }

      //event fires when branch changes
      this.resolveRank = function () {
        this.militaryServiceTypes = lookupDataService.getMilitaryServiceTypeLookups(this.ngModel.MilitaryBranch);
        //Reset the rank
        this.ngModel.MilitaryStatus = null;
      };
    }]
  }
}
