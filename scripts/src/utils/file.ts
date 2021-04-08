const fs = require('fs');
const path = require('path');

import { MonthlyUmempolymentDataPaths } from '../../../shared/types';
import {
    MonthlyUmempolymentData
} from '../donwload-data';

import { 
    UNEMPLOYMENT_COUNTIES_FILE_NAME, 
    UNEMPLOYMENT_PATHS_COUNTIES_FILE_NAME,
    UNEMPLOYMENT_PATHS_STATES_FILE_NAME, 
    UNEMPLOYMENT_STATES_FILE_NAME 
} from '../../../shared/constants';

const PUBLIC_FOLDER_PATH = path.join(__dirname, '../../../public');
const OUTPUT_JSON_US_COUNTIES = path.join(PUBLIC_FOLDER_PATH, UNEMPLOYMENT_COUNTIES_FILE_NAME);
const OUTPUT_JSON_US_COUNTIES_PATHS = path.join(PUBLIC_FOLDER_PATH, UNEMPLOYMENT_PATHS_COUNTIES_FILE_NAME);
const OUTPUT_JSON_US_STATES = path.join(PUBLIC_FOLDER_PATH, UNEMPLOYMENT_STATES_FILE_NAME);
const OUTPUT_JSON_US_STATES_PATHS = path.join(PUBLIC_FOLDER_PATH, UNEMPLOYMENT_PATHS_STATES_FILE_NAME);

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