const fs = require('fs');
const path = require('path');

import { MonthlyUmempolymentDataPaths } from '../calculatePaths';
import {
    MonthlyUmempolymentData
} from '../donwload-data';

const PUBLIC_FOLDER_PATH = path.join(__dirname, '../../../public');
const OUTPUT_JSON_US_COUNTIES = path.join(PUBLIC_FOLDER_PATH, 'unemployment-counties.json');
const OUTPUT_JSON_US_COUNTIES_PATHS = path.join(PUBLIC_FOLDER_PATH, 'unemployment-counties-paths.json');
const OUTPUT_JSON_US_STATES = path.join(PUBLIC_FOLDER_PATH, 'unemployment-states.json');
const OUTPUT_JSON_US_STATES_PATHS = path.join(PUBLIC_FOLDER_PATH, 'unemployment-states-paths.json');

export const saveCountiesData = (data:MonthlyUmempolymentData)=>{
    writeToJson(data, OUTPUT_JSON_US_COUNTIES);
};

export const saveStatesData = (data:MonthlyUmempolymentData)=>{
    writeToJson(data, OUTPUT_JSON_US_STATES);
};

export const savePathsData4States = (data:MonthlyUmempolymentDataPaths)=>{
    writeToJson(data, OUTPUT_JSON_US_STATES_PATHS);
};

export const savePathsData4Counties = (data:MonthlyUmempolymentDataPaths)=>{
    writeToJson(data, OUTPUT_JSON_US_COUNTIES_PATHS);
};

const writeToJson = (data:any, outputPath)=>{
    const json = JSON.stringify(data);
    // const outputFileName = 'data.json';
    fs.writeFile(outputPath, json, 'utf8', ()=>{
        console.log(new Date(), `${outputPath} is saved`, '\n');
    });
};

const makeFolder = (dir)=>{
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
};

makeFolder(PUBLIC_FOLDER_PATH);