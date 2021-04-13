import axios from 'axios'

const SERVICE_URL = 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/BLS_Monthly_Unemployment_Current_14_Months/FeatureServer';
const LAYER_ID_US = '0';
const LAYER_ID_STATE = '1';
const LAYER_ID_COUNTIES = '2';

import {
    BasicFeature
} from '../../shared/types';

type MonthlyUnemploymentFeature = {
    attributes: {
        fips: string;

        PctUnemployed_CurrentMonth: number;
        PctUnemployed_01Month : number;
        PctUnemployed_02Month : number;
        PctUnemployed_03Month : number;
        PctUnemployed_04Month : number;
        PctUnemployed_05Month : number;
        PctUnemployed_06Month : number;
        PctUnemployed_07Month : number;
        PctUnemployed_08Month : number;
        PctUnemployed_09Month : number;
        PctUnemployed_10Month : number;
        PctUnemployed_11Month : number;
        PctUnemployed_12Month : number;
        PctUnemployed_13Month : number;

        CurrentMonth: string;
        P13Month: string;

        [key:string]: any;
    },
    centroid: {
        x: number;
        y: number;
    }
}

type QueryResult = {
    features: MonthlyUnemploymentFeature[]
}

type UnempolymentData = BasicFeature & {
    PctUnemployed: number[];
    PctUnemployedDeviation?: number[];
}

export type MonthlyUmempolymentData = {
    data: UnempolymentData[];
    maxPctUnemployed: number;
}

const outFields = 'fips, PctUnemployed_CurrentMonth, PctUnemployed_01Month, PctUnemployed_02Month, PctUnemployed_03Month, PctUnemployed_04Month, PctUnemployed_05Month, PctUnemployed_06Month, PctUnemployed_07Month, PctUnemployed_08Month, PctUnemployed_09Month, PctUnemployed_10Month, PctUnemployed_11Month, PctUnemployed_12Month, PctUnemployed_13Month, CurrentMonth, P13Month';

const queryParams = {
    f: 'json',
    // exclude Puerto Rico
    where: 'fips <> 72',
    returnGeometry: false,
    returnCentroid: true,
    outSR: 4326,
    outFields
}

const QueryParams = `f=json&where=1=1&returnGeometry=false&returnCentroid=true&outSR=4326&outFields=${outFields}`;

// use this function to fetch data for all 50 states or the entire US
export const fecthData4States = async(shouldFetchNationalAverage=false):Promise<MonthlyUmempolymentData>=>{

    const layerId = shouldFetchNationalAverage ? LAYER_ID_US : LAYER_ID_STATE;

    try{
        const { data } = await axios.get<QueryResult>(`${SERVICE_URL}/${layerId}/query`, { params: queryParams });
        return processQueryResult(data.features);
    } catch(err){
        console.error(err)
    }

    return null;
}

export const fetchData4Counties = async():Promise<MonthlyUmempolymentData>=>{
    try {

        const response4Counties1 = await axios.get<QueryResult>(`${SERVICE_URL}/${LAYER_ID_COUNTIES}/query?${QueryParams}`);

        const response4Counties2 = await axios.get<QueryResult>(`${SERVICE_URL}/${LAYER_ID_COUNTIES}/query?${QueryParams}&resultOffset=2000`);

        const features = [
            ...response4Counties1.data.features,
            ...response4Counties2.data.features
        ];

        return processQueryResult(features)

    } catch(err){
        console.error(err)
    }

    return null;
}

const processQueryResult = (features:MonthlyUnemploymentFeature[]):MonthlyUmempolymentData=>{

    if(!features || !features.length){
        return;
    }

    let maxPctUnemployed = 0;

    const data:UnempolymentData[] = features.map(feature=>{

        const {
            attributes,
            centroid
        } = feature;

        const { 
            fips,
            PctUnemployed_CurrentMonth,
            PctUnemployed_01Month,
            PctUnemployed_02Month,
            PctUnemployed_03Month,
            PctUnemployed_04Month,
            PctUnemployed_05Month,
            PctUnemployed_06Month,
            PctUnemployed_07Month,
            PctUnemployed_08Month,
            PctUnemployed_09Month,
            PctUnemployed_10Month,
            PctUnemployed_11Month,
            PctUnemployed_12Month,
            PctUnemployed_13Month,
        } = attributes;

        const PctUnemployed = [
            PctUnemployed_13Month,
            PctUnemployed_12Month,
            PctUnemployed_11Month,
            PctUnemployed_10Month,
            PctUnemployed_09Month,
            PctUnemployed_08Month,
            PctUnemployed_07Month,
            PctUnemployed_06Month,
            PctUnemployed_05Month,
            PctUnemployed_04Month,
            PctUnemployed_03Month,
            PctUnemployed_02Month,
            PctUnemployed_01Month,
            PctUnemployed_CurrentMonth
        ];

        maxPctUnemployed = Math.max(maxPctUnemployed, Math.max(...PctUnemployed))

        const {
            x, y
        } = centroid;

        return {
            attributes: {
                fips,
                name: ''
            },
            geometry: {
                x: +x.toFixed(5),
                y: +y.toFixed(5)
            },
            PctUnemployed,
        };
    });

    return {
        data,
        maxPctUnemployed
    }
};
