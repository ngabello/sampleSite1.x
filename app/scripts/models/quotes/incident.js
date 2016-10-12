/**
 * Created by gabello on 10/20/2014.
 */
function IncidentModelService() {
  'use strict';

  return ['QuoteIntentModel',
    function (quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          IncidentTypeID: null,
          Date: null,
          Desc: null,
          DriverID: null,
          DriverName: null,
          ID:null,
          Classification:null
        };
        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

        saveIncident: function () {
          var currentIncidents = quoteIntentModel.getIncidents();
          var foundIncident = _.findWhere(currentIncidents, {DriverId: this.DriverId, Classication: this.Classication, Date: this.Date});
          //dont add the same incident twice
          if(!foundIncident) {
            if (!this.ID) {
              this.ID = createGuid();
            }
            quoteIntentModel.saveIncident(this);
          }
        },

        removeIncident: function () {
          quoteIntentModel.removeIncident(this);
        },

        populateData: function (data) {
          _.extend(this, data);
        }


      });

      return clazz;
    }
  ];
}
