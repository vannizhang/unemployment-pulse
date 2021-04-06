import axios from 'axios'

const SERVICE_URL = 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/BLS_Monthly_Unemployment_Current_14_Months/FeatureServer';
const LAYER_ID_STATE = '1';
const LAYER_ID_COUNTIES = '2';

const fecthData = async()=>{
    try{
        const { data } = await axios('https://jsonplaceholder.typicode.com/todos/1')
        console.log(data)
    } catch(err){
        console.error(err)
    }
}

fecthData();