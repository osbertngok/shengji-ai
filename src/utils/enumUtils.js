/**
 * Created by osbertngok on 2/3/2017.
 */
'use strict';
const getToEnumStringFunc = (dict) => {
    const reversedDict = [];
    for(let prop in dict) {
        if (dict.hasOwnProperty(prop)) {
            reversedDict[dict[prop]] = prop;
        }
    }
    return (enumInt) => {
        if (enumInt === undefined) {
            return 'undefined_value';
        }
        const ret = reversedDict[enumInt];
        return ret === undefined ? 'undefined_enum' : ret;
    }
};

module.exports = {
  'getToEnumStringFunc': getToEnumStringFunc
};