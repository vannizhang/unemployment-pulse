import {
    fecthData4States,
    fetchData4Counties
} from './donwload-data';

import {
    saveCountiesData,
    saveStatesData,
    savePathsData4States,
    savePathsData4Counties,
    savePathsData4US,
    saveData4US
} from './utils/file';

import {
    convertUnemploymentDataToPaths
} from './calculatePaths';

const start = async()=>{

    try {

        const data4US = await fecthData4States(true);
        saveData4US(data4US);

        const paths4US = convertUnemploymentDataToPaths(data4US);
        savePathsData4US(paths4US)

        // fetch data from ArcGIS Online Hosted feature service
        const data4states = await fecthData4States();
        saveStatesData(data4states);

        const paths4States = convertUnemploymentDataToPaths(data4states);
        savePathsData4States(paths4States)
        // const data4counties = await fetchData4Counties();

        const data4Counties = await fetchData4Counties();
        saveCountiesData(data4Counties);

        const paths4Counties = convertUnemploymentDataToPaths(data4Counties);
        savePathsData4Counties(paths4Counties);

    } catch(err){
        console.error(err);
    }
};

start();