/**
 * Created by gabello on 12/5/2014.
 */
function ModalService() {
  'use strict';

  var _showMessage = function ($uibModal, title, message, description, actionObj, iconClass, zipCode, page, showCancel, options, cancelBtnLabel, template, passingObject, backdrop, controller) {
    var opts = {
      templateUrl: template || '../scripts/services/platform/modal/templates/modalTemplate.html',
      backdrop: backdrop || true,
      controller: controller || 'modalController',
      resolve: {
        model: function () {
          return {
            title: title,
            message: message,
            description: description,
            showCancelBtn: showCancel,
            iconClass: iconClass,
            cancelBtnLabel: cancelBtnLabel || 'Close',
            action: actionObj,
            zipCode: zipCode,
            page: page,
            passingObject: passingObject
          };
        }
      }
    };
    if(options){
      angular.extend(opts, options);
    }

    return $uibModal.open(opts);
  };

  var _showTimeOutMessage = function ($uibModal, title, message, description, actionObj, iconClass, zipCode, page, showCancel, options, cancelBtnLabel) {
    var opts = {
      templateUrl: '../scripts/services/platform/modal/templates/timeoutTemplate.html',
      backdrop: 'static',
      controller: 'modalController',
      resolve: {
        model: function () {
          return {
            title: title,
            message: message,
            description: description,
            showCancelBtn: showCancel,
            iconClass: iconClass,
            cancelBtnLabel: cancelBtnLabel || 'Close',
            action: actionObj,
            zipCode: zipCode,
            page: page

          };
        }
      }
    };
    if(options){
      angular.extend(opts, options);
    }

    return $uibModal.open(opts);
  };

  function _showSystemError($uibModal, error) {
    var opts = {
      templateUrl: '../scripts/services/platform/modal/templates/errorTemplate.html',
      backdrop: 'static',
      controller: 'systemErrorController',
      resolve: {
        params: function () {
          return {
            error: error
          };
        }
      }
    };

    return $uibModal.open(opts);
  }

  return ['$uibModal', '$log', function ($uibModal, $log) {
    return {

      showSystemError: function (error) {
        return _showSystemError($uibModal, error);
      },

      showError: function (title, message, iconClass, description, actionLabel, actionBtnClass) {
        var actionProperties = {
          label: actionLabel || 'Close',
          btnClass: actionBtnClass
        };
        return _showMessage($uibModal, title, message, description, actionProperties, iconClass, null, null, false);
      },
      showWarning: function(title, message, iconClass, description, template, object, actionLabel, actionBtnClass){
        var actionProperties = {
          label: actionLabel || 'Close',
          btnClass: actionBtnClass
        };
        return _showMessage($uibModal, title, message, description, actionProperties, iconClass, null, null, null, null, null, template, object, 'static');
      },
      showTimeOut: function (title, message, iconClass, description, actionLabel, actionBtnClass) {
        var actionProperties = {
          label: actionLabel || 'Close',
          btnClass: actionBtnClass
        };
        return _showTimeOutMessage($uibModal, title, message, description, actionProperties, iconClass, null, null, false);
      },

      showConfirm: function (title, message, description, actionLabel, actionBtnClass, cancelLabel) {
        var actionProperties = {
          label: actionLabel,
          btnClass: actionBtnClass || 'btn-primary'
        };
        cancelLabel = cancelLabel || 'Cancel';
        var opts = {
          keyboard: false
        };
        return _showMessage($uibModal, title, message, description, actionProperties, 'messageQuestionIcon', messageTemplate, true, opts, cancelLabel);
      },

      showMediaAlpha: function (title, zipCode, page, message, description, actionLabel, actionBtnClass){
        var actionProperties = {
          label: actionLabel || 'Close',
          btnClass: actionBtnClass
        };
        return _showMessage($uibModal, title, message, description, actionProperties, 'messageErrorIcon', zipCode, page);
      },

      showMessage: function(title, message, template, state, passingObject, controller){
        var actionProperties = {
          label: 'Close',
          btnClass: 'btn-primary'
        };
        return _showMessage($uibModal, title, message, null, actionProperties, 'messageErrorIcon', null, state, null, null, null, template, passingObject, null, controller);
      }

    };
  }];
}
