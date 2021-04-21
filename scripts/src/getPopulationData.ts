// ArcGIS REST JS is supported in Node.js 8.x and above. It requires additional packages to polyfill Fetch and FormData.
require('isomorphic-form-data');
const fetch = require('node-fetch');
import { IQueryFeaturesResponse, queryFeatures } from '@esri/arcgis-rest-feature-layer';
import { setDefaultRequestOptions } from '@esri/arcgis-rest-request';

// use node-fetch for each request instead of relying on a global
setDefaultRequestOptions({ fetch })

type PopulationLookup = {
    [fips:string]: {
        name: string;
        population: number;
    }
}

export const populationLookup:PopulationLookup = {};

const ACS_TOTAL_POPULATION_FEATURE_SERVICE_URL = 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Total_Population_Boundaries/FeatureServer';

export const downloadACSData = async()=>{

    const outFields = ['GEOID','NAME','B01001_001E','State'];
    const outFields4States = outFields.filter(field=>field !== 'State');

    const queryResponse4States = await queryFeatures({
        url: `${ACS_TOTAL_POPULATION_FEATURE_SERVICE_URL}/0`,
        where: '1=1',
        outFields: outFields4States,
        returnGeometry: false,
        f: 'json'
    }) as IQueryFeaturesResponse

    const queryResponse4Counties1 = await queryFeatures({
        url: `${ACS_TOTAL_POPULATION_FEATURE_SERVICE_URL}/1/query`,
        where: '1=1',
        outFields,
        returnGeometry: false,
        f: 'json'
    }) as IQueryFeaturesResponse

    const queryResponse4Counties2 = await queryFeatures({
        url: `${ACS_TOTAL_POPULATION_FEATURE_SERVICE_URL}/1/query`,
        where: '1=1',
        outFields,
        returnGeometry: false,
        resultOffset: 2000,
        f: 'json'
    }) as IQueryFeaturesResponse

    if(queryResponse4States && queryResponse4States.features){

        const { features } = queryResponse4States;

        for(let feature of features){
            const {
                GEOID,
                NAME,
                B01001_001E
            } = feature.attributes;
    
            populationLookup[GEOID] = {
                name: NAME,
                population: B01001_001E
            }
        }
    }

    if(
        queryResponse4Counties1 && 
        queryResponse4Counties1.features &&
        queryResponse4Counties2 && 
        queryResponse4Counties2.features
    ){
        const features = [
            ...queryResponse4Counties1.features,
            ...queryResponse4Counties2.features
        ]

        for(let feature of features){
            const {
                GEOID,
                NAME,
                State,
                B01001_001E
            } = feature.attributes;
    
            populationLookup[GEOID] = {
                name: NAME + ', ' + State,
                population: B01001_001E
            }
        }
    }
};