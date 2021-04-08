import {
    fecthData4States,
    fetchData4Counties
} from './donwload-data';

import {
    saveCountiesData,
    saveStatesData,
    savePathsData4States,
    savePathsData4Counties
} from './utils/file';

import {
    convertUnemploymentDataToPaths
} from './calculatePaths';

const start = async()=>{

    try {
        // fetch data from ArcGIS Online Hosted feature service
        const data4states = await fecthData4States();
        saveStatesData(data4states);

        const paths4States = convertUnemploymentDataToPaths(data4states);
        savePathsData4States(paths4States)
        // const data4counties = await fetchData4Counties();

    } catch(err){
        console.error(err);
    }
};

start();