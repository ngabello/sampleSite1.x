/**
 * Created by gurpreet.singh on 01/13/2015.
 */

var JsonHelper = function()
{
  this.ReadExcel=function(customConfig)
  {
    var deferred = protractor.promise.defer();
    var promise = deferred.promise;
    var Pull = require('excel-push-pull').Pull;
    var pull = new Pull();
    pull.setFilePath(customConfig.testDataPath);
    pull.records(customConfig.sheetId,function(err, recordsData)
    {
      console.log("Fulfilling deffer");
      deferred.fulfill(recordsData);
    });
    return promise;
  };

  this.parseJsonArrays = function(stringToParse)
  {
    //console.log("stringToParse= "+stringToParse);

    var retArray = [];
    try { retArray =  JSON.parse(stringToParse);}
    catch(ex){ retArray = []; }
    return retArray;
  };

  this.inArray = function(jarry, objectToFind, ignoreCase)
  {
    var retIndex = -1;

    ignoreCase = ignoreCase == undefined ? false : ignoreCase;

    for(var j = 0; j < jarry.length; j++)
    {
      if((jarry[j] == objectToFind) || (ignoreCase && jarry[j].toLowerCase() == objectToFind.toLowerCase()))
      {
        retIndex = j;
        break;
      }
    }
    return retIndex;
  };

  this.GetDifferenceInYears = function(dateWithoutSptr)
  {
    if(dateWithoutSptr == "" || isNaN(dateWithoutSptr) || dateWithoutSptr.length != 8)
    {
      return undefined;
    }

    var birthday = +new Date(dateWithoutSptr.substr(4,4), dateWithoutSptr.substr(0,2), dateWithoutSptr.substr(2,2));
    return ~~((Date.now() - birthday) / (31557600000));
  };



  this.Trim = function(x) {
    return x.replace(/^\s+|\s+$/gm,'');
  }
};

module.exports = JsonHelper;
