/**
 * Created by vyom.sharma on 04-12-2014.
 */

var DriverHistory = function ()
{
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  this.HasIncidents = 'currentDriver.HasIncidents';
  this.DriverName = by.model('incident.DriverId');
  this.IncidentClassification = by.model('incident.IncidentClassificationId');
  this.DateOfIncident = by.model('incident.DateOfIncident');
  this.addIncident = 'addIncident.selected';
  this.btnContinue = by.id('btnContinue');

  this.setValues = function (obj)
  {
    var hasIncident = obj.Incidents != undefined && obj.Incidents.length > 0 ? "Yes" : "No";

    this.setHasIncidents(hasIncident);

    if(hasIncident == "Yes")
    {
      for(var i = 0; i < obj.Incidents.length; i++)
      {
        var incident = obj.Incidents[i];
        console.log("incident.DriverName= "+incident.DriverName);
        if(obj.MaritalStatus=='Married' || obj.OtherDriversYourHome=='Yes')
        {
          if(incident.DriverName==obj.DriverNumber)
          {
            this.setDriverName(obj.FirstName+" "+obj.LastName);
          }
          else
          {
            for(var j=0;j<obj.ListedDrivers.length;j++)
            {
              if(incident.DriverName==obj.ListedDrivers[j].DriverNumber)
              {
                this.setDriverName(obj.ListedDrivers[j].FirstName+" "+obj.ListedDrivers[j].LastName);
              }
            }
          }
        }

        this.setIncidentClassification(incident.Description);
        this.setDateOfIncident(incident.OccurrenceDate);
        if(i==obj.Incidents.length-1)
        {
          this.setAddIncident('No');
          this.clickContinue();
        }
        else
        {
          this.setAddIncident('Yes');
          this.clickContinue();
        }

      }
    }
    else
    {
      this.clickContinue();
    }
  };

  this.setHasIncidents = function (hasIncidents)
  {
    helper.RadioButtonClick(this.HasIncidents, hasIncidents);
  };

  this.setDriverName = function (driverName)
  {
    helper.setDropDown(this.DriverName, driverName);
  };

  this.setIncidentClassification = function (incidentClassification)
  {
    helper.setDropDown(this.IncidentClassification, incidentClassification);
  };

  this.setDateOfIncident = function (dateOfIncident)
  {
    helper.setText(this.DateOfIncident, dateOfIncident);
  };

  this.setAddIncident = function (value)
  {
    helper.RadioButtonClick(this.addIncident,value);
  };

  this.clickContinue = function ()
  {
    helper.click(this.btnContinue);
  };
};

module.exports = DriverHistory;
