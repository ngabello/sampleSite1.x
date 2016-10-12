/**
 * Created by gabello on 10/8/2014.
 */
function VehicleModelService() {
  'use strict';
return [ 'QuoteIntentModel',
    function (quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          AntiTheftDevice: null,
          AvailableCoverages: [],
          BrandedTitle: false,
          CostWhenNew: null,
          CurrentOwner: null,
          CustomEquipment: null,
          DamageDescription: null,
          DateOfAcquisition: null,
          DiminishingDeductibleFee: null,
          EstimatedAnnualMileage: null,
          Fees: [],
          HasDiminishingDeductible: null,
          ID: null,
          IsDamaged: null,
          Lienholder: {
            Name: null,
            AddressLine1: null,
            AddressLine2: null,
            City: null,
            State: null,
            PostalCode: null
          },
          Make: null,
          MakeID: null,
          Model: null,
          ModelID: null,
          MonthSelected:null,
          Ownership: null,
          PrimaryDriverID: null,
          RegistrationState: null,
          ShortModelName: null,
          Style: null,
          PrimaryUse: null,
          ValueOfCustomEquipment: null,
          Vin: null,
          Year: null,
          YearsVehicleOwned: null,
          YearSelected:null,
          YearStyleID: null
        };
        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

        getMake: function () {
          return this.Make;
        },

        getVehicleDescription: function() {
          if(!this.Model){
            return String.format('{0} {1}', this.Year, this.Make)
          }
          return String.format('{0} {1} {2}', this.Year, this.Make, this.Model)
        },

        save: function () {
          if (!this.ID) {
            this.ID = createGuid();
          }
          //this.setVehicleDefaults();
          quoteIntentModel.saveVehicle(this);
          return this.ID;
        },

        remove: function () {
          if (!this.ID) {
            return;
          }
          quoteIntentModel.removeVehicle(this.ID);
          return this.ID;
        },

        populateData: function (data) {
          _.extend(this, data);

          if (data.YearStyleID == 0) {
            this.YearStyleID = null;
            this.Style = null;
          }

          //Vin stub is being returned from pc this is bad
          //so delete
          //if (this.Vin && this.Vin.length < 15) {
          //  this.Vin = null;
          //}

          //Default to null cause pc cannot
          if (!this.Vin) {
            this.IsDamaged = null;
          }

          this.save();
        }
      });

      return clazz;
    }];
}
