import axios from 'axios'

export const UNEMPLOYMENT_SERVICE_URL = 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/BLS_Monthly_Unemployment_Current_14_Months/FeatureServer';
const LAYER_ID_US = '0';
const LAYER_ID_STATE = '1';
const LAYER_ID_COUNTIES = '2';

import {
    UnempolymentData, 
    MonthlyUmempolymentData
} from '../../shared/types';

import {
    populationLookup
} from './getPopulationData'

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

        LaborForce_CurrentMonth: number;
        Unemployed_CurrentMonth: number;

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

const outFields = 'fips, PctUnemployed_CurrentMonth, PctUnemployed_01Month, PctUnemployed_02Month, PctUnemployed_03Month, PctUnemployed_04Month, PctUnemployed_05Month, PctUnemployed_06Month, PctUnemployed_07Month, PctUnemployed_08Month, PctUnemployed_09Month, PctUnemployed_10Month, PctUnemployed_11Month, PctUnemployed_12Month, PctUnemployed_13Month, CurrentMonth, P13Month, LaborForce_CurrentMonth, Unemployed_CurrentMonth';

const queryParams = {
    f: 'json',
    // exclude Puerto Rico
    where: 'fips <> 72',
    returnGeometry: false,
    returnCentroid: true,
    outSR: 4326,
    outFields
}

// const QueryParams = `f=json&where=1=1&returnGeometry=false&returnCentroid=true&outSR=4326&outFields=${outFields}`;

// use this function to fetch data for all 50 states or the entire US
export const fecthData4States = async(shouldFetchNationalAverage=false):Promise<MonthlyUmempolymentData>=>{

    const layerId = shouldFetchNationalAverage ? LAYER_ID_US : LAYER_ID_STATE;

    try{
        const { data } = await axios.get<QueryResult>(`${UNEMPLOYMENT_SERVICE_URL}/${layerId}/query`, { params: queryParams });
        return processQueryResult(data.features);
    } catch(err){
        console.error(err)
    }

    return null;
}

export const fetchData4Counties = async():Promise<MonthlyUmempolymentData>=>{
    try {

        const where = `STATE <> 'Puerto Rico'`

        const response4Counties1 = await axios.get<QueryResult>(`${UNEMPLOYMENT_SERVICE_URL}/${LAYER_ID_COUNTIES}/query`, {
            params: {
                ...queryParams,
                where
            }
        });

        const response4Counties2 = await axios.get<QueryResult>(`${UNEMPLOYMENT_SERVICE_URL}/${LAYER_ID_COUNTIES}/query`, {
            params: {
                ...queryParams,
                where,
                resultOffset: 2000,
            }
        });

        const features = [
            ...response4Counties1.data.features,
            ...response4Counties2.data.features
        ];

        return processQueryResult(features, true)

    } catch(err){
        console.error(err)
    }

    return null;
}

const processQueryResult = (features:MonthlyUnemploymentFeature[], shouldExlcudeFeaturesNotFoundInACS=false):MonthlyUmempolymentData=>{

    if(!features || !features.length){
        return;
    }

    let maxPctUnemployed = 0;

    if(shouldExlcudeFeaturesNotFoundInACS){
        features = features.filter(feature=>{
            const {
                attributes,
            } = feature;
    
            const { fips } = attributes;
    
            return populationLookup[fips] !== undefined
        })
    }

    const pctUnemployedSorted = features
        .map(feature=>{
            const {
                attributes,
            } = feature;

            const { 
                PctUnemployed_CurrentMonth,
            } = attributes;

            return PctUnemployed_CurrentMonth
        })
        .sort((a,b)=>b-a);

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
            LaborForce_CurrentMonth,
            Unemployed_CurrentMonth
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

        const populationData = populationLookup[fips];

        const name = populationData ? populationData.name : '';
        const population = populationData ? populationData.population : 0;
        const rank = binarySearchIdx(pctUnemployedSorted, PctUnemployed_CurrentMonth) + 1;

        const geometry = {
            x: +x.toFixed(5),
            y: +y.toFixed(5)
        };

        return {
            attributes: {
                fips,
                name,
                population,
                workforce: LaborForce_CurrentMonth,
                unemployed: Unemployed_CurrentMonth,
                unemploymentRate: PctUnemployed_CurrentMonth,
                rank
            },
            geometry,
            PctUnemployed,
        };
    });

    return {
        data,
        maxPctUnemployed
    }
};

export const addDeviationData = (monthlyUnemploymentData:MonthlyUmempolymentData, nationalUnemploymentData:MonthlyUmempolymentData):MonthlyUmempolymentData=>{

    const pctUnemployedFromNationalData = nationalUnemploymentData.data[0].PctUnemployed;

    if(!pctUnemployedFromNationalData || !pctUnemployedFromNationalData.length){
        console.error('failed to calc deviation data - national unemployment data are not available');
        return;
    }

    let maxPctUnemployedDeviation = 0;

    monthlyUnemploymentData.data = monthlyUnemploymentData.data.map(d=>{

        const { PctUnemployed } = d;

        const PctUnemployedDeviation = PctUnemployed.map((pctUnemployed, idx)=>{
            const pctUnemployedNational = pctUnemployedFromNationalData[idx];
            const deviation = +(pctUnemployed - pctUnemployedNational).toFixed(2);

            if(Math.abs(deviation) > maxPctUnemployedDeviation){
                maxPctUnemployedDeviation = Math.abs(deviation)
            }

            return deviation;
        });

        return {
            ...d,
            PctUnemployedDeviation,
        }
    })

    return {
        ...monthlyUnemploymentData,
        maxPctUnemployedDeviation
    };
}
// find index of target number from a desc sorted array, which will be used as rank
const binarySearchIdx = (nums: number[], target:number):number=>{
    let left = 0;
    let right = nums.length - 1;

    while(left <= right){
        const midIdx = Math.floor((left + right) / 2);

        if(target < nums[midIdx]){
            left = midIdx + 1;
        } else {
            right = midIdx - 1;
        }
    }

    return left;
}
