/**
 * Created by gurpreet.singh on 12/04/2014.
 */

'use strict';

var Vehicle = function()
{
  this.VehicleNumber = undefined;
  this.VIN = undefined;
  this.ModelYear = undefined;
  this.Make = undefined;
  this.Model = undefined;
  this.PrimaryUse = undefined;
  this.EstimatedAnnualMileage = undefined;

  this.VehicleCounty = undefined;
  this.VehicleZipCode = undefined;
  this.Coverages = undefined;
  this.CustomEquipment = undefined;
  this.LocationName = undefined;
  this.Yearsowned = undefined;
  this.WhoDrivesthisVehicle = undefined;
  this.ValueOfCustomEquipment=undefined;
  this.CurrentOwner=undefined;
  this.LienHolderAddressLine1=undefined;

  this.LienHolderAddressLine1=undefined;
  this.LienHolderAddressLine2=undefined;
  this.LienHolderCity=undefined;
  this.LienHolderState=undefined;
  this.LienHolderPostalCode=undefined;
  this.LienHolderName=undefined;

  this.Ownership=undefined;
  this.DamageDescription=undefined;
  this.IsDamaged=undefined;

};

module.exports = Vehicle;
