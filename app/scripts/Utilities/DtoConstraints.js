function DtoConstraints() {
    'use strict';

    return {

        FirstName: function (firstName){
            var isTrue = true;
            if(firstName < 10){
                isTrue = false;
            }
            return isTrue;
        }


    };
}