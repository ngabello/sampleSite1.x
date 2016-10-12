/**
 * Created by jholloman on 1/23/2015.
 */
function MessageService() {
  'use strict';
  return ['fraudMessage', 'privacyMessage', 'ModalService', 'quoteMessages', 'quoteChangeReason', function (fraudMessage, privacyMessage, ModalService, quoteMessages, quoteChangeReason) {
    return {
      showFraudStatement: function () {
        ModalService.showMessage(fraudMessage.modalTitle, null, fraudMessage.modalTemplate);
      },
      showPrivacyPolicy: function () {
        ModalService.showMessage(privacyMessage.modalTitle, null, privacyMessage.modalTemplate);
      },
      showQuoteChangeReason: function(){
        ModalService.showMessage(quoteChangeReason.modalTitle, null, quoteChangeReason.modalTemplate);
      },

      showQuoteMessage: function (item, state) {
        var title = {};
        var template = {};

        switch (item) {
          case 'EISPABodilyInjuryCov':
            title = quoteMessages.bodilyInjury.modalTitle;
            template = quoteMessages.bodilyInjury.modalTemplate;
            break;
          case 'PACollisionCov':
            title = quoteMessages.collisionCoverage.modalTitle;
            template = quoteMessages.collisionCoverage.modalTemplate;
            break;
          case 'EISPAIncomeLossCov':
            title = quoteMessages.incomeLoss.modalTitle;
            template = quoteMessages.incomeLoss.modalTemplate;
            break;
          case 'PAComprehensiveCov':
            title = quoteMessages.otherCollision.modalTitle;
            template = quoteMessages.otherCollision.modalTemplate;
            break;
          case 'EISPAPropertyDamageCov':
            title = quoteMessages.propertyDamage.modalTitle;
            template = quoteMessages.propertyDamage.modalTemplate;
            break;
          case 'PATowingLaborCov':
            title = quoteMessages.towingCoverage.modalTitle;
            template = quoteMessages.towingCoverage.modalTemplate;
            break;
          case 'PAUMBICov':
            title = quoteMessages.uninsuredBodily.modalTitle;
            template = quoteMessages.uninsuredBodily.modalTemplate;
            break;
          case 'PAUMPDCov':
            title = quoteMessages.uninsuredProperty.modalTitle;
            template = quoteMessages.uninsuredProperty.modalTemplate;
            break;
          case 'PAMedPayCov':
            title = quoteMessages.medicalPayments.modalTitle;
            template = quoteMessages.medicalPayments.modalTemplate;
            break;
          case 'PARentalCov':
            title = quoteMessages.rentalReimbursement.modalTitle;
            template = quoteMessages.rentalReimbursement.modalTemplate;
            break;
          case 'EISPALoanGapCov':
            title = quoteMessages.loanLeasePayoff.modalTitle;
            template = quoteMessages.loanLeasePayoff.modalTemplate;
            break;
          case 'EISPACustEquipCov':
            title = quoteMessages.customEquipment.modalTitle;
            template = quoteMessages.customEquipment.modalTemplate;
            break;
          case 'DiminishingDeductible':
            title = quoteMessages.diminishingDeductible.modalTitle;
            template = quoteMessages.diminishingDeductible.modalTemplate;
            break;
          case 'LegalPlan':
            title = quoteMessages.legalPlan.modalTitle;
            template = quoteMessages.legalPlan.modalTemplate;
            break;
          case 'PAPIP_MD':
          case 'PAPIP_TX':
            title = quoteMessages.pipCoverage.modalTitle;
            template = quoteMessages.pipCoverage.modalTemplate;
            break;
          default:
            return;
        }

        ModalService.showMessage(title, null, template, state);
      }
    }
  }]
}
