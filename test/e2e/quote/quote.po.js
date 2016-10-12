/**
 * Created by vyom.sharma on 17-12-2014.
 */



var Quote = function()
{
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  //Primary coverage
  this.bodyInjuryLiablity='Bodily Injury Liability';
  this.propertyDamageLiblity='Property Damage Liability';
  this.unInsuredUnderInsuredMotoristBodyInjury='Uninsured/Underinsured Motorist - Bodily Injury';
  this.unInsuredUnderInsuredMotoristPropertDamage='Uninsured/Underinsured Motorist - Property Damage';
  this.medicalPayments='Medical Payments';
  this.incomeLoss='Income Loss';

  //Additional Coverage
  this.otherThanCollosion='Other Than Collision';
  this.collision='Collision';
  this.roadSideAssistance='Roadside Assistance';
  this.rentalReimbursement='Rental Reimbursement';
  this.loanLeasePayoff='Loan Lease Payoff';
  this.customEquipmentCoverage='Custom Equipment Coverage';

  this.btnContinue = by.tagName('button');


  this.setValues = function (obj)
  {
    var ptor = browser;
    helper.openAccordian();
    ptor.executeScript('window.scrollTo(0,0);');
    this.setBodyInjuryLiablity(obj.Vehicles[0].Coverages.BI);
    ptor.executeScript('window.scrollTo(0,20);');
    this.setPropertyDamageLiblity(obj.Vehicles[0].Coverages.PD);
    ptor.executeScript('window.scrollTo(0,40);');
    this.setUnInsuredUnderInsuredMotoristBodyInjury(obj.Vehicles[0].Coverages.UMBI);
    ptor.executeScript('window.scrollTo(0,60);');
    this.setUnInsuredUnderInsuredMotoristPropertDamage(obj.Vehicles[0].Coverages.UMPD);
    ptor.executeScript('window.scrollTo(0,80);');
    this.setMedicalPayments(obj.Vehicles[0].Coverages.MED);
    ptor.executeScript('window.scrollTo(0,100);');
    this.setIncomeLoss(obj.Vehicles[0].Coverages.ILC);
    ptor.executeScript('window.scrollTo(0,160);');
    for(var i=0;i<obj.Vehicles.length;i++)
    {
      var vehicleName=obj.Vehicles[i].ModelYear+" "+obj.Vehicles[i].Make +" "+obj.Vehicles[i].Model;
      ptor.executeScript('window.scrollTo(0,180);');
      this.setOtherThanCollosion(obj.Vehicles[i].Coverages.OTCOLL,vehicleName);
      this.setCollision(obj.Vehicles[i].Coverages.COLL,vehicleName);
      ptor.executeScript('window.scrollTo(0,200);');
      this.setRoadSideAssistance(obj.Vehicles[i].Coverages.RA,vehicleName);
      ptor.executeScript('window.scrollTo(0,220);');
      this.setRentalReimbursement(obj.Vehicles[i].Coverages.RR,vehicleName);
      ptor.executeScript('window.scrollTo(0,240);');
      this.setLoanLeasePayoff(obj.Vehicles[i].Coverages.LOAN,vehicleName);
      ptor.executeScript('window.scrollTo(0,260);');
      this.setCustomEquipmentCoverage(obj.Vehicles[i].Coverages.CUST,vehicleName);
    }

  };

  this.setPrimaryCoverages=function()
  {

  };

  this.openAccordian=function()
  {

  };

  this.setBodyInjuryLiablity= function (bodyInjuryLiablity)
  {
    helper.setPrimaryCoverage(this.bodyInjuryLiablity,bodyInjuryLiablity,'coverage in quote.CustomLineCoverages');
  };

  this.setPropertyDamageLiblity= function (propertyDamageLiblity)
  {
    helper.setPrimaryCoverage(this.propertyDamageLiblity,propertyDamageLiblity,'coverage in quote.CustomLineCoverages');
  };

  this.setUnInsuredUnderInsuredMotoristBodyInjury=function(unInsuredUnderInsuredMotoristBodyInjury)
  {
    helper.setPrimaryCoverage(this.unInsuredUnderInsuredMotoristBodyInjury,unInsuredUnderInsuredMotoristBodyInjury,'coverage in quote.CustomLineCoverages');
  };

  this.setUnInsuredUnderInsuredMotoristPropertDamage=function(unInsuredUnderInsuredMotoristPropertDamage)
  {
    helper.setPrimaryCoverage(this.unInsuredUnderInsuredMotoristPropertDamage,unInsuredUnderInsuredMotoristPropertDamage,'coverage in quote.CustomLineCoverages');
  };

  this.setMedicalPayments=function(medicalPayments)
  {
    helper.setPrimaryCoverage(this.medicalPayments,medicalPayments,'coverage in quote.CustomLineCoverages');
  };

  this.setIncomeLoss=function(incomeLoss)
  {
    helper.setPrimaryCoverage(this.incomeLoss,incomeLoss,'coverage in quote.CustomLineCoverages');
  };

  this.setOtherThanCollosion=function(otherThanCollosion,vehicleName)
  {
    helper.setAdditionalCoverage(this.otherThanCollosion,otherThanCollosion,vehicleName);
  };

  this.setCollision=function(collision,vehicleName)
  {
    helper.setAdditionalCoverage(this.collision,collision,vehicleName);
  };

  this.setRoadSideAssistance=function(roadSideAssistance,vehicleName)
  {
    helper.setAdditionalCoverage(this.roadSideAssistance,roadSideAssistance,vehicleName);
  };

  this.setRentalReimbursement=function(rentalReimbursement,vehicleName)
  {
    helper.setAdditionalCoverage(this.rentalReimbursement,rentalReimbursement,vehicleName);
  };

  this.setLoanLeasePayoff=function(loanLeasePayoff,vehicleName)
  {
    helper.setAdditionalCoverage(this.loanLeasePayoff,loanLeasePayoff,vehicleName);
  };

  this.setCustomEquipmentCoverage=function(customEquipmentCoverage,vehicleName)
  {
    helper.setAdditionalCoverage(this.customEquipmentCoverage,customEquipmentCoverage,vehicleName);
  }

  this.clickContinue = function ()
  {
    var ptor = browser;
    ptor.executeScript('window.scrollTo(0,0);');
    helper.click(this.btnContinue);
  };

};

module.exports = Quote;

