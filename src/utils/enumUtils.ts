/**
 * Created by osbertngok on 2/3/2017.
 */
'use strict';
export const getToEnumStringFunc = (dict: {[key: string]: string}) => {
    const reversedDict: any[] = [];
    for (const prop in dict) {
        if (dict.hasOwnProperty(prop)) {
            reversedDict[dict[prop]] = prop;
        }
    }
    return enumInt => {
        if (enumInt === undefined) {
            return 'undefined_value';
        }
        const ret = reversedDict[enumInt];
        return ret === undefined ? 'undefined_enum' : ret;
    };
};
