// ArcGIS REST JS is supported in Node.js 8.x and above. It requires additional packages to polyfill Fetch and FormData.
// require('isomorphic-form-data');
// const fetch = require('node-fetch');
import { IFeature, IQueryFeaturesResponse, queryFeatures } from '@esri/arcgis-rest-feature-service';
import {
    getStateAbbrev
} from './getStateAbbrev';

// use node-fetch for each request instead of relying on a global
// setDefaultRequestOptions({ fetch })

type PopulationLookup = {
    [fips:string]: {
        name: string;
        population: number;
    }
}

/**
 * ACS Population (Latest)
 * @see https://www.arcgis.com/home/item.html?id=60c98f20a162416ea1725b94d7297f83
 */
const ACS_TOTAL_POPULATION_FEATURE_SERVICE_URL = 'https://p3eplmys2rvchkjx.svcs.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Population_View_Boundaries/FeatureServer';


export const populationLookup:PopulationLookup = {};

/**
 * This helper function is used to query all features from a feature service layer. 
 * It handles pagination by checking the exceededTransferLimit property in the response and using resultOffset to fetch the next set of features until all features are retrieved.
 * @param url 
 * @param params 
 * @returns 
 */
const queryFeaturesHelper = async(url:string, params:any):Promise<IFeature[]>=>{
    const features: IFeature[] = [];

    let resultOffset = 0;
    let hasMore = true;

    while(hasMore){
        const response = await queryFeatures({
            url,
            params: {
                ...params,
                resultOffset
            }
        }) as IQueryFeaturesResponse;

        if(response && response.features){
            features.push(...response.features);
            if(response.exceededTransferLimit){
                resultOffset += response.features.length;
            }
            else {
                hasMore = false;
            }
        }
        else {
            hasMore = false;
        }
    }

    return features;
}


export const downloadACSData = async()=>{

    const outFields = ['GEOID','NAME','B01001_001E'];

    // const queryResponse4States = await queryFeatures({
    //     url: `${ACS_TOTAL_POPULATION_FEATURE_SERVICE_URL}/0`,
    //     where: '1=1',
    //     outFields,
    //     returnGeometry: false,
    //     f: 'json'
    // }) as IQueryFeaturesResponse

    const features4States = await queryFeaturesHelper(
        `${ACS_TOTAL_POPULATION_FEATURE_SERVICE_URL}/0/query`,
        {   
            where: '1=1',
            outFields,
            returnGeometry: false,
            f: 'json'
        }
    )   

    // const queryResponse4Counties1 = await queryFeatures({
    //     url: `${ACS_TOTAL_POPULATION_FEATURE_SERVICE_URL}/1/query`,
    //     where: '1=1',
    //     outFields,
    //     returnGeometry: false,
    //     f: 'json'
    // }) as IQueryFeaturesResponse

    // const queryResponse4Counties2 = await queryFeatures({
    //     url: `${ACS_TOTAL_POPULATION_FEATURE_SERVICE_URL}/1/query`,
    //     where: '1=1',
    //     outFields,
    //     returnGeometry: false,
    //     resultOffset: 2000,
    //     f: 'json'
    // }) as IQueryFeaturesResponse
    const features4Counties = await queryFeaturesHelper(
        `${ACS_TOTAL_POPULATION_FEATURE_SERVICE_URL}/1/query`,
        {
            where: '1=1',
            outFields,
            returnGeometry: false,
            f: 'json'
        }
    )

    if(features4States && features4States.length > 0){

        // const { features } = queryResponse4States;

        for(let feature of features4States){
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
        features4Counties && features4Counties.length > 0
    ){
        const features = features4Counties

        for(let feature of features){
            const {
                GEOID,
                NAME,
                B01001_001E
            } = feature.attributes;

            let countyName = NAME;

            if(/\sCensus Area/gi.test(NAME)){
                countyName = NAME.replace(/\sCensus Area/gi, '');
            } 
            else if (/\sCity and Borough/gi.test(NAME)){
                countyName = NAME.replace(/\sCity and Borough/gi, '');
            }
            else {
                // remove the word "county" from end of the county name 
                countyName = NAME.split(' ').slice(0, -1).join(' ');
            }

            const stateName = getStateAbbrev(GEOID.slice(0,2));

            // for DC, use the state name as the county name since it's a city and county in one
            const name = GEOID === '11001' 
                ? stateName 
                : countyName + ', ' + stateName;
    
            populationLookup[GEOID] = {
                name,
                population: B01001_001E
            }
        }
    }
};