/**
 * Created by gabello on 1/15/2016.
 */
function IncidentService() {
  'use strict';

  //All States – No more than 3 per driver in last 36 months (never changed)
  function ValidateAtFault(recentIncidents) {
    var atFaultIncidents = _.where(recentIncidents, {Classification: 'AFA'});
    var atFaultGroups;
    //group them by driver
    if (atFaultIncidents && atFaultIncidents.length > 3) {
      atFaultGroups = _.groupBy(atFaultIncidents, function (incident) {
        return incident.DriverID;
      })
    }
    //see if any one driver has more than 3 at faults
    var ifAtFault;
    _.find(atFaultGroups, function (group) {
      ifAtFault = group.length > 3
    });
    return ifAtFault;
  }

  function validateIncidents(incidents, addressState) {
    var dt = new Date();
    //get the date from 36 months ago
    var pastDate = dt.setMonth(dt.getMonth() - 36);

    //get incidents that are within the last 36 months
    var recentIncidents = _.filter(incidents, function (incident) {
      var incidentDate = new Date(incident.Date);
      return incidentDate >= pastDate;
    });

    //Reject Any Driver > 3 At Fault Accidents
    var ifAtFault = ValidateAtFault(recentIncidents);
    if (ifAtFault) return false;

    //Reject Any Driver > 2 DUI
    var duiIncidents = _.where(recentIncidents, {Classification: 'DUI'});
    if(duiIncidents && duiIncidents.length > 2) return false;

    if(addressState == 'TX') {
      //Reject any driver with 2 or more minor convictions. Texas Only
      var minorIncidents = _.where(recentIncidents, {Classification: 'MIN'});
      if(minorIncidents && minorIncidents.length > 1) return false;

      //Reject any driver any major violations. Texas Only
      var majorIncidents = _.where(recentIncidents, {Classification: 'MAJ'});
      if(majorIncidents && majorIncidents.length > 0) return false;
    }

    return true;
  }

  return ['QuoteIntentModel', function (quoteIntentModel) {
    return {

      validateIncidents: function () {
        var incidents = quoteIntentModel.getIncidents();
        var state = quoteIntentModel.getAddress().State;
        return validateIncidents(incidents, state);
      }

    }
  }];
}
