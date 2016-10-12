function LoadingIndicationService() {
    'use strict';

    var messageCount = 0;
    return [function(){
        return{
            loadingListeners: {},

            show: function(listenerId, message) {
                var returnVal = messageCount;
                var loadingListener = this.loadingListeners[listenerId];
                var messageObj = {
                    id: messageCount++,
                    msg: message
                };
                if(!loadingListener){
                    this.loadingListeners[listenerId] = {
                        queuedRequests: [messageObj],
                        currentlyDisplayedMsg: message
                    };
                }else{
                    loadingListener.queuedRequests.push(messageObj);
                    loadingListener.currentlyDisplayedMsg = message;
                }
                return returnVal;
            },

            hide: function(listenerId, id) {
                var messageObj, removeIdx;
                var queuedMessages = this.loadingListeners[listenerId].queuedRequests;
                for(var requestIdx = 0; requestIdx < queuedMessages.length; requestIdx++){
                    messageObj = queuedMessages[requestIdx];
                    if(messageObj.id === id){
                        removeIdx = requestIdx;
                        break;
                    }
                }
                if(removeIdx !== -1){
                    queuedMessages.splice(removeIdx, 1);
                    this.loadingListeners[listenerId].currentlyDisplayedMsg = (queuedMessages.length > 0)? queuedMessages[length-1]: null;
                }

            }

        };
    }];
};