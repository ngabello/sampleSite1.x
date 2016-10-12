/**
 * Created by gabello on 12/3/2014.
 */
function LoggingEventService(){
  'use strict';
  function hasOwnProperty(obj, prop) {
    var proto = obj.constructor.prototype;
    return (prop in obj) &&
      (!(prop in proto) || proto[prop] !== obj[prop]);
  }

  function logToConsole(message) {
    if (window && window.console && typeof window.console.log === 'function') {
      console.log(message);
    }
  }

  function logFormErrors($window, quoteId, quoteNumber, form){
    try {
      var formError = {
        ll: 'warn',
        url: $window.location.href,
        userAgent: $window.navigator.userAgent,
        quoteIntentId: quoteId,
        quoteNumber: quoteNumber,
        formName:null,
        validationErrors: []
      };
      //If there is no error key then bail
      if(!form.$error){
        return;
      }

      formError.formName = form.$name;

      _.each(form.$error, function(error){
        if(_.isArray(error)){
          _.each(error, function(errorItem){
            //for whatever reason if there are multiple validationTypes angular adds multiple errors for each
            var existingError = _.findWhere(formError.validationErrors, {fieldName: errorItem.$name});
            if(!existingError) {
              formError.validationErrors.push({
                fieldName: errorItem.$name,
                validationTypes: errorItem.$error ? Object.keys(errorItem.$error) : null,
                modelValue: errorItem.$modelValue,
                lastCommitedValue: errorItem.$$lastCommittedViewValue
              });
            }
          })
        }
      });

      console.dir(formError);

      _LTracker.push(formError);
    } catch (parsingError) {
      _LTracker.push(parsingError);
    }
  }

  var logMessage = function ($window, message, level, exception, quoteId, quoteNumber) {

    // Now, we need to try and log the error the server.
    try {

      var error = {
        ll: level,
        url: $window.location.href,
        userAgent: $window.navigator.userAgent,
        quoteIntentId: quoteId,
        quoteNumber: quoteNumber,
        exception: '',
        stackTrace: {},
        pcErrorCode: {},
        message:''
      };

      try {
        //Fill Message
        if(message !== null && message != undefined){
          if(_.isString(message)){
            error.message = message.toString();
          }else if (_.isObject(message)) {
            if (hasOwnProperty(message, 'stack')) {
              error.message = message.stack;
            }else if(hasOwnProperty(message, 'message')) {
              error.message = message.message;
            }
          }
        }

        //Fill exception
        if (exception !== null && exception !== undefined) {
          if (exception instanceof Error) {
            if (hasOwnProperty(exception, 'message')) {
              error.exception = exception.message.toString();
            }
          }else if(_.isString(exception)){
            error.exception = exception.toString();
          }else if (_.isObject(exception)) {
            if (exception.constructor === Array) {
              error.exception = 'Undefined exception of type Array caught';
            } else if (exception.constructor === Object) {
              var stackTrace = {};
              if (hasOwnProperty(exception, 'config')) {
                stackTrace.url = exception.config.url;
                if (hasOwnProperty(exception.config, 'method')) {
                  stackTrace.method = exception.config.method;
                }
              }
              if (hasOwnProperty(exception, 'status')) {
                stackTrace.status = exception.status;
              }
              if (hasOwnProperty(exception, 'data')) {
                if (typeof (exception.data) === 'string') {
                  error.exception = exception.data;
                } else if (_.isObject(exception.data)) {
                  if (hasOwnProperty(exception.data, 'message')) {
                    error.exception = JSON.stringify(exception.data.message);
                  }
                  if (hasOwnProperty(exception.data, 'errors')) {
                    if(_.isObject(exception.data.errors)) {
                      if (exception.data.errors.constructor === Array) {
                        var dataErrors = [];
                        var pcErrorCodes = [];
                        _.each(exception.data.errors, function (errorItem) {
                          if (hasOwnProperty(errorItem, 'Message')) {
                            dataErrors.push(errorItem.Message);
                          }
                          if(hasOwnProperty(errorItem, 'PCErrorCode')) {
                            pcErrorCodes.push(errorItem.PCErrorCode);
                          }
                        });
                        error.exception = dataErrors.join();
                        error.pcErrorCode = pcErrorCodes.join();
                      }
                      if (exception.data.errors.constructor === Object) {
                        if (hasOwnProperty(exception.data.errors, 'detail')) {
                          error.exception = exception.data.errors.detail;
                        }
                      }
                    }
                  }
                }
              }
              error.stackTrace = stackTrace;
            } else if (exception.constructor === Function) {
              error.exception = exception.toString;
            } else if (exception.constructor === String) {
              error.exception = exception;
            } else if (exception.constructor === Number) {
              error.exception = exception;
            }
          }
        }
      } catch (exceptionError) {
        _LTracker.push('LoggingEventService: An exception occurred handling the variable exception ' + exceptionError.message);
      }

      if (error.message) {
        logToConsole(error.message);
      }

      if (error.exception) {
        logToConsole(error.exception);
      }

      _LTracker.push(error);
    } catch (loggingError) {
      _LTracker.push(loggingError);
    }
  };

  var getQuoteIdentifier = function(quoteIntent){
    if(quoteIntent){
      var quoteIntentId = quoteIntent.getQuoteIntentId();
      return quoteIntentId;
    }else{
      return null;
    }
  };
  var getQuoteNumber = function(quoteIntent){
    if(quoteIntent){
      return quoteIntent.getQuoteNumber();
    }else{
      return null;
    }
  };

  return ['$window', 'logLevel', 'QuoteIntentModel',  function ($window, logLevel, quoteIntent) {
    return {

      log: function(logItem){
        if(!logItem){
          return;
        }
        //test this to see if its a form object
        if(Object.keys(logItem).indexOf('$$parentForm') > -1){
          logFormErrors($window, getQuoteIdentifier(quoteIntent), getQuoteNumber(quoteIntent), logItem);
        }
      },

      logDebug: function (message) {
        if (logLevel.level === 'debug') {
          logMessage($window, message, 'debug', null, getQuoteIdentifier(quoteIntent), getQuoteNumber(quoteIntent));
        }
      },
      logInfo: function (message) {
        if (logLevel.level === 'info') {
          logMessage($window, message, 'info', null, getQuoteIdentifier(quoteIntent), getQuoteNumber(quoteIntent));
        }
      },
      logWarn: function (message) {
        if (logLevel.level === 'error' || logLevel.level === 'warn') {
          logMessage($window, message, 'warn', null, getQuoteIdentifier(quoteIntent), getQuoteNumber(quoteIntent));
        }
      },
      logError: function (message, exception) {
        if(message || exception) {
          logMessage($window, message, 'error', exception, getQuoteIdentifier(quoteIntent), getQuoteNumber(quoteIntent));
        }
      }
    };
  }];
}
