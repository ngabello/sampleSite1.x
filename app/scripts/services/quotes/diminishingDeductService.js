/**
 * Created by jholloman on 4/6/2016.
 */
'use strict';
function DiminishingDeductService(){


  return[ function(){
    return {
      init: function(model){
        model.eligible = false;

        //all vehicles with selected coverage eligible
        var allSelected = _.where(model.collection, {collisionSelected: true});

        //We check every vehicle to see if they are eligible for diminishing deductible
        //Then we check to see if the flag has already been set on ALL vehicles so we can set the drop down To 'agree'.
        if ((allSelected.length > 0)) {
          if (_.every(allSelected, function (e) {
              return e.eligible;
            })) {
            model.eligible = true;
            model.collection = allSelected;
          }
          if (_.every(allSelected, function (e) {
              return e.HasDiminishingDeductible;
            })) {
            model.eligible = true;
            model.selectedValue = true;
          }
        }
      },
      checkValues: function(vehicles){
        //gets all the vehicle coverages and separates them by vehicle, to be used in the repeater
        var collection = [];
        _.each(vehicles, function (vehicle) {
          //initially check vehicles for diminishing deductible eligility.  Added because of defaulting collision
          //coverage for vehicles with a lien
          var selectedCoverage = _.findWhere(vehicle.AvailableCoverages, {Name: 'PACollisionCov'});
          if (selectedCoverage) {
            if (selectedCoverage.SelectedValue >= 500) {
              collection.push({
                DDTriggered: true,
                collisionSelected: true,
                eligible: true,
                vehicleId: vehicle.ID,
                HasDiminishingDeductible: vehicle.HasDiminishingDeductible
              })
            } else {
              collection.push({
                DDTriggered: true,
                collisionSelected: true,
                eligible: false,
                vehicleId: vehicle.ID,
                HasDiminishingDeductible: vehicle.HasDiminishingDeductible
              })
            }
          } else {
            collection.push({
              DDTriggered: true,
              collisionSelected: false,
              eligible: false,
              vehicleId: vehicle.ID,
              HasDiminishingDeductible: vehicle.HasDiminishingDeductible
            })
          }
        });
        return collection;
      },
      getFees: function(model, vehicles){
        model.fees = 0;
        _.each(vehicles, function (item) {
          if (item.HasDiminishingDeductible && item.DiminishingDeductibleFee) {
            model.fees += parseInt(item.DiminishingDeductibleFee);
          }
        })
      },
      setValue: function(model, ddObj){
        var ids = _.map(ddObj.collection, function(v){
          return v.vehicleId;
        });
        _.each(ids, function(id){
          var vehicle = _.findWhere(model.vehicles, {ID: id});
          if(vehicle){
            return vehicle.HasDiminishingDeductible = ddObj.SelectedValue;
          }
        })
      }
    }
  }]
}
