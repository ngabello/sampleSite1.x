/**
 * Created by jholloman on 9/17/2015.
 */
'use strict';
function TrackOccupation(){
  return ['segmentIoTrackingService', function(segmentIoTrackingService){
    return{
      require: 'ngModel',
      link: function(sc, el, at, ctrl){
        //track all key presses for occupation
        var collection = [];
        el.on('keyup', function(evt){
          if(evt){
            if(evt.keyCode == 8){
              return collection.push('|');
            }else if(evt.keyCode == 13){
              return $('#btnContinue').click();
            }else {
              return collection.push(_.last($(this).val()));
            }
          }
        });
        $('#btnContinue').click(function(){
          //grab display value to send along to segment
          var viewDescription = (ctrl.$modelValue)?_.findWhere(sc.occupations, {Value: ctrl.$modelValue}) : null;
          //send display value along with attempted entries
          //if no item is choosen from the drop down model will be empty
          segmentIoTrackingService.trackCustomEvent('track occupation attempts', [
            {key: 'occupation_keyed', value: collection.join('')},
            {key: 'occupation_selected', value: (viewDescription)? viewDescription.Description : null}
          ]);
          //clear the array after sending to segment
          collection = [];
        })
      }
    }
  }]
}
