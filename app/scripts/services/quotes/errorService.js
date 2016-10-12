/**
 * Created by gabello on 1/5/2015.
 */
function ErrorService() {
  'use strict';

  return ['$log', 'spinnerService', 'ModalService', 'errorMessageInfo', 'warningMessageInfo', 'timeoutMessageInfo', 'coverageWarningInfo',
    '$window', 'quoteChangeReason', 'quoteMessages',
    function ($log, spinnerService, modalService, errorMessageInfo, warningMessageInfo, timeoutMessageInfo, coverageWarningInfo, $window,
              quoteChangeReason, quoteMessages) {
      return {
        showSystemError: function(errorText, error){
          $log.error(errorText, error);
          spinnerService.hideAll();
          modalService.showSystemError(error);
        },
        showModalError: function (errorText, error) {
          $log.error(errorText, error);
          spinnerService.hideAll();
          modalService.showError(errorMessageInfo.modalTitle, errorMessageInfo.modalDescription, errorMessageInfo.iconClass, errorMessageInfo.modalClass);
        },
        showNetworkError: function (error) {
          $log.error('Network connectivity lost', error);
          spinnerService.hideAll();
          modalService.showError(errorMessageInfo.modalTitle, errorMessageInfo.modalDescription, errorMessageInfo.iconClass, errorMessageInfo.modalClass);
        },
        showModalWarning: function () {
          spinnerService.hideAll();
          modalService.showError(warningMessageInfo.modalTitle, warningMessageInfo.modalDescription, warningMessageInfo.iconClass, warningMessageInfo.modalClass)
        },

        showModalTimeout: function () {
          spinnerService.hideAll();
          modalService.showTimeOut(timeoutMessageInfo.modalTitle, timeoutMessageInfo.modalDescription, timeoutMessageInfo.iconClass, timeoutMessageInfo.modalClass)
        },
        showCoverageWarning: function (item) {
          spinnerService.hideAll();
          if ($window.lienholderTrigger) {
            modalService.showWarning(coverageWarningInfo.modalTitle, coverageWarningInfo.description, coverageWarningInfo.iconClass, coverageWarningInfo.modalClass, coverageWarningInfo.modalTemplateV2, item)
          }
          else {
            modalService.showWarning(coverageWarningInfo.modalTitle, coverageWarningInfo.description, coverageWarningInfo.iconClass, coverageWarningInfo.modalClass, coverageWarningInfo.modalTemplateV1, item)
          }
        },
        showDmsConfirmation: function(vehicles){
          spinnerService.hideAll();
          modalService.showMessage(quoteMessages.dmsConfirmation.modalTitle, null, quoteMessages.dmsConfirmation.modalTemplate, null, vehicles, 'dmsController');
        }

      }
    }
  ];
}
