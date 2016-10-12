/**
 * Created by gabello on 11/18/2014.
 */
GetDLPatterByState = function(stateValue) {
    var patternvalue = '';
    switch (stateValue && stateValue.toUpperCase()) {
        case 'AL':
            patternvalue = '\\d{7}';
            break;
        case 'AK':
            patternvalue = '\\d{1,7}';
            break;
        case 'AB':
            patternvalue = '(\\d{2,6}-\\d{3}|[a-zA-Z]\\d{5}|\\d{4,9})';
            break;
        case 'AZ':
            patternvalue = '([a-zA-Z]\\d{8}|[a-zA-Z]{2}\\d{3,6}|\\d{9})';
            break;
        case 'AR':
            patternvalue = '\\d{8,9}';
            break;
        case 'CA':
            patternvalue = '[a-zA-Z]\\d{7}';
            break;
        case 'CO':
            patternvalue = '([a-zA-Z]{1,2}\\d{1,6}|\\d{9})';
            break;
        case 'CT':
            patternvalue = '(0[1-9]|1\\d|2[0-4]|99)\\d{7}';
            break;
        case 'DE':
            patternvalue = '\\d{1,7}';
            break;
        case 'FL':
            patternvalue = '[a-zA-Z]\\d{11,12}';
            break;
        case 'GA':
            patternvalue = '\\d{7,9}';
            break;
        case 'HI':
            patternvalue = '[\\dH]\\d{8}';
            break;
        case 'ID':
            patternvalue = '([a-zA-Z]{1,2}\\d{3,8}[a-zA-Z]|\\d{9})';
            break;
        case 'IL':
            patternvalue = '[a-zA-Z]\\d{11}';
            break;
        case 'IN':
            patternvalue = '([a-zA-Z]\\d{9}|\\d{9,10})';
            break;
        case 'IA':
            patternvalue = '(\\d{3}[a-zA-Z]{2}\\d{4}|\\d{9})';
            break;
        case 'KS':
            patternvalue = '([a-zA-Z]\\d[a-zA-Z]\\d[a-zA-Z]\\d|\\d[a-zA-Z]\\d[a-zA-Z]\\d[a-zA-Z]|[a-zA-Z\\d]\\d{8})';
            break;
        case 'KY':
            patternvalue = '[a-zA-Z\\d]\\d{8}';
            break;
        case 'LA':
            patternvalue = '\\d{1,9}';
            break;
        case 'ME':
            patternvalue = '\\d{7}[xX]?';
            break;
        case 'MD':
            patternvalue = '[a-zA-Z]\\d{12}';
            break;
        case 'MA':
            patternvalue = '[a-zA-Z\\d]\\d{8}';
            break;
        case 'MI':
            patternvalue = '[a-zA-Z]\\d{12}';
            break;
        case 'MN':
            patternvalue = '[a-zA-Z]\\d{12}';
            break;
        case 'MS':
            patternvalue = '\\d{9}';
            break;
        case 'MO':
            patternvalue = '([a-zA-Z][a-zA-Z\\d ]{5,9}|\\d{9}|\\d{1,9}[a-zA-Z]|[a-zA-Z]\\d{15}[a-zA-Z\\d]?)';
            break;
        case 'MT':
            patternvalue = '(\\d{9}|[a-zA-Z]\\d[a-zA-Z\\d]\\d{2}[a-zA-Z]{3}\\d|\\d{13}|[a-zA-Z]\\d[a-zA-Z\\d]\\d{2}([ -]{3}|[a-zA-Z]([a-zA-Z][a-zA-Z -]|[ -]{2}))\\d?)';
            break;
        case 'NE':
            patternvalue = '[a-zA-Z]\\d{3,8}';
            break;
        case 'NV':
            patternvalue = '(\\d{10}|\\d{12})';
            break;
        case 'NB':
            patternvalue = '\\d{1,7}';
            break;
        case 'NH':
            patternvalue = '\\d{2}[a-zA-Z]{3}\\d{5}';
            break;
        case 'NJ':
            patternvalue = '[a-zA-Z]\\d{14}';
            break;
        case 'NM':
            patternvalue = '\\d{8,9}';
            break;
        case 'NY':
            patternvalue = '(\\d{9}|[a-zA-Z]\\d{16,21})';
            break;
        case 'NC':
            patternvalue = '\\d{1,8}';
            break;
        case 'ND':
            patternvalue = '(\\d{9}|[a-zA-Z]{3}\\d{6}|[a-zA-Z]\\d{8})';
            break;
        case 'OH':
            patternvalue = '(\\d{9}|[a-zA-Z]{2}\\d{6})';
            break;
        case 'OK':
            patternvalue = '(\\d{9}|[a-zA-Z\\d]\\d{9})';
            break;
        case 'ON':
            patternvalue = '[a-zA-Z]\\d{4}-?\\d{4}-?\\d{6}';
            break;
        case 'OR':
            patternvalue = '\\d{1,7}';
            break;
        case 'PA':
            patternvalue = '\\d{8}';
            break;
        case 'RI':
            patternvalue = '[vV\\d]\\d{6}';
            break;
        case 'SC':
            patternvalue = '\\d{6,9}';
            break;
        case 'SD':
            patternvalue = '(\\d{6}|\\d{8,9})';
            break;
        case 'TN':
            patternvalue = '\\d{7,9}';
            break;
        case 'TX':
            patternvalue = '\\d{8}';
            break;
        case 'UT':
            patternvalue = '\\d{4,10}';
            break;
        case 'VT':
            patternvalue = '\\d{7}[aA\\d]';
            break;
        case 'VA':
            patternvalue = '([a-zA-Z\\d]\\d{8}|\\d{12})';
            //patternvalue = '[A-Za-z](?!(\d\d)\1{3})((\d){8}|(\d){12})';
            break;
        case 'WA':
            patternvalue = '[a-zA-Z\\*]{7}[a-zA-Z\\d]\\d[\\d\\*][a-zA-Z\\d]{2}';
            break;
        case 'DC':
            patternvalue = '([a-zA-Z]{2}\\d{8}|\\d{7}|\\d{9})';
            break;
        case 'WV':
            patternvalue = '([0]\\d{6}|[a-fsA-FS]\\d{6}|[1xX][xX]\\d{5})';
            break;
        case 'WI':
            patternvalue = '[a-zA-Z]\\d{13}';
            break;
        case 'WY':
            patternvalue = '\\d{6}[\\d-]\\d{2,3}';
            break;
      case 'ZZ':
            patternvalue = '^[^ /]+$';
            break;
    }
    return patternvalue;
};
