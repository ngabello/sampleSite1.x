/**
 * Created by gurpreet.singh on 12/04/2014.
 */

'use strict';

var Incident = function()
{
  this.DriverName = undefined;
  this.OtherDriver = undefined;
  this.Description = undefined;
  this.OccurrenceDate = undefined;
  this.IncidentForgivenessIND = false;
};

module.exports = Incident;
