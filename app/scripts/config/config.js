/**
 * Created by gabello on 10/30/2014.
 */
angular.module('quotes.config', [])

  .constant('journeyInfo', {
    v1: {
      identifier: 'v1-',
      journeyPath: 'scripts/customerJourneys/classicJourney/config/JourneyState.json'
    },
    v2: {
      identifier: 'v2-',
      journeyPath: 'scripts/customerJourneys/classicJourney_2.0/config/JourneyState.json'
    },
    v3: {
      identifier: 'v3-',
      journeyPath: 'scripts/customerJourneys/j3_v1/config/JourneyState.json'
    }
  })
  .constant('postalCodeTypeConst', {
    postalCodeType: 'PO BOX'
  })

  .constant('pachydermContactInfo', {
    phone: '1-877-321-2096',
    legalphone: '1-800-728-5768',
    quoteIssuePhone: '1-877-321-2096',
    exoticVehiclePhone: '1-866-884-6167',
    sales: '1-877-321-9911',
    policy: '1-866-218-7865'
  })
  .constant('coveredStates', ['VA', 'IL', 'MD', 'TX', 'IN', 'TN'])
  .constant('radioChoices', {
    yesNo: [{Value: 'Yes', Desc: 'Yes'}, {Value: 'No', Desc: 'No'}],
    yesNoUnsure: [{Value: 'Yes', Desc: 'Yes'}, {Value: 'No', Desc: 'No'}, {
      Value: 'Unsure',
      Desc: 'Unsure'
    }],
    trueFalse: [{Value: true, Desc: 'Yes'}, {Value: false, Desc: 'No'}],
    agreeDisagree: [{Value: true, Desc: 'Agree'}, {Value: false, Desc: 'Disagree'}],
    gender: [{Value: 'M', Desc: 'Male'}, {Value: 'F', Desc: 'Female'}],
    yesNoBool: [{Value: true, Desc: 'Yes'}, {Value: false, Desc: 'No'}]
  })
  .constant('sessionKeys', {
    prefillSource: 'prefillSource',
    quoteIntentId: 'quoteIntentId',
    quoteId: 'quoteId',
    previousView: 'previousView',
    journey: 'journey'
  })
  .constant('errorMessageInfo', {
    modalTitle: 'Oops, we encountered an error',
    modalDescription: 'Sorry we could not finish your quote please try again',
    modalClass: 'alert-danger',
    iconClass: 'fa-exclamation-circle'
  })
  .constant('warningMessageInfo', {
    modalTitle: 'Something might happen',
    modalDescription: 'Placeholder',
    modalClass: 'alert-warning',
    iconClass: 'fa-exclamation-triangle'
  })
  .constant('coverageWarningInfo', {
    modalTitle: 'Coverage Warning',
    modalDescription: '',
    modalTemplateV1: '../views/quotes/modals/coverage-warning-v1.html',
    modalTemplateV2: '../views/quotes/modals/coverage-warning-v2.html',
    modalClass: 'alert-warning',
    iconClass: 'fa-exclamation-triangle'
  })
  .constant('quoteChangeReason', {
    modalTitle: 'Reason for price change',
    modalTemplate: '../views/quotes/modals/quote-change-reason.html'
  })
  .constant('timeoutMessageInfo', {
    modalTitle: 'Let\'s get you started',
    modalDescription: '',
    modalClass: 'alert-success',
    iconClass: 'fa-car'
  })
  .constant('fraudMessage', {
    modalTitle: 'Fraud Statement',
    modalTemplate: '../views/quotes/modals/fraud-statement.html'
  })
  .constant('privacyMessage', {
    modalTitle: 'Privacy Policy',
    modalTemplate: '../views/quotes/modals/privacy-policy.html'
  })
  .constant('bindMessages', {
    defaultBindError: 'Unfortunately, your payment was not processed successfully.<br/>' +
    'Please reenter your credit card information or try another payment method.<br/>' +
    'For additional assistance, call {0} to speak with an agent.'
  })
  .constant('quoteMessages', {
    bodilyInjury: {
      modalTitle: 'Bodily Injury',
      modalTemplate: '../views/quotes/modals/bodily-injury.html'
    },
    collisionCoverage: {
      modalTitle: 'Collision Coverage',
      modalTemplate: '../views/quotes/modals/collision-coverage.html'
    },
    incomeLoss: {
      modalTitle: 'Income Loss',
      modalTemplate: '../views/quotes/modals/income-loss.html'
    },
    otherCollision: {
      modalTitle: 'Other Than Collision',
      modalTemplate: '../views/quotes/modals/other-collision.html'
    },
    propertyDamage: {
      modalTitle: 'Property Damage',
      modalTemplate: '../views/quotes/modals/property-damage.html'
    },
    towingCoverage: {
      modalTitle: 'Towing Coverage',
      modalTemplate: '../views/quotes/modals/towing-coverage.html'
    },
    uninsuredBodily: {
      modalTitle: 'Uninsured Motorist Bodily Damage',
      modalTemplate: '../views/quotes/modals/uninsured-bodily.html'
    },
    uninsuredProperty: {
      modalTitle: 'Uninsured Motorist Property Damage',
      modalTemplate: '../views/quotes/modals/uninsured-property.html'
    },
    medicalPayments: {
      modalTitle: 'Medical Payments',
      modalTemplate: '../views/quotes/modals/medical-payments.html'
    },
    rentalReimbursement: {
      modalTitle: 'Rental Reimbursement',
      modalTemplate: '../views/quotes/modals/rental-reimbursement.html'
    },
    pipCoverage: {
      modalTitle: 'PIP Coverage',
      modalTemplate: '../views/quotes/modals/pip-coverage.html'
    },
    customEquipment: {
      modalTitle: 'Custom Equipment',
      modalTemplate: '../views/quotes/modals/custom-equipment.html'
    },
    loanLeasePayoff: {
      modalTitle: 'Loan Lease Payoff',
      modalTemplate: '../views/quotes/modals/loanlease-payoff.html'
    },
    diminishingDeductible: {
      modalTitle: 'Diminishing Deductible',
      modalTemplate: '../views/quotes/modals/diminishing-deductible.html'
    },
    legalPlan: {
      modalTitle: 'Legal Assistance',
      modalTemplate: '../views/quotes/modals/legal-plan.html'
    },
    dmsConfirmation: {
      modalTitle: 'We found vehicle(s) that may belong to you.',
      modalTemplate: '../views/quotes/modals/dmsTemplate.html'
    }
  })


;



