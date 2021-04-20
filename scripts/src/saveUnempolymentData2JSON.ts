import {
    UnempolymentData,
    UnempolymentDataByFIPS
} from '../../shared/types';

import {
    saveUnempolymentDataByFIPS
} from './utils/file';

export const saveUnemploymentData = (data:UnempolymentData[])=>{

    const unempolymentDataByFIPS:UnempolymentDataByFIPS = {};

    for(let item of data){
        const { attributes, PctUnemployed, PctUnemployedDeviation } = item;
        const { fips } = attributes;
        unempolymentDataByFIPS[fips] = {
            attributes, 
            PctUnemployed, 
            PctUnemployedDeviation 
        };
    }

    saveUnempolymentDataByFIPS(unempolymentDataByFIPS);
}