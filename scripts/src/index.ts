import {
    fecthData4States,
    fetchData4Counties
} from './donwload-data';

import {
    saveCountiesData,
    saveStatesData
} from './utils/file'

const start = async()=>{

    try {
        // fetch data from ArcGIS Online Hosted feature service
        const data4states = await fecthData4States();

        // save fetched data into a .json file
        saveStatesData(data4states)

        // const data4counties = await fetchData4Counties();

    } catch(err){
        console.error(err);
    }
};

start();