import {
    fecthData4States,
    fetchData4Counties,
    addDeviationData
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

        // fetch data from ArcGIS Online Hosted feature service
        let data4states = await fecthData4States();
        data4states = addDeviationData(data4states, data4US)
        saveStatesData(data4states);

        let data4Counties = await fetchData4Counties();
        data4Counties = addDeviationData(data4Counties, data4US)
        saveCountiesData(data4Counties);

        const paths4States = convertUnemploymentDataToPaths(data4states);
        savePathsData4States(paths4States)
        // const data4counties = await fetchData4Counties();

        const paths4Counties = convertUnemploymentDataToPaths(data4Counties);
        savePathsData4Counties(paths4Counties);

        const paths4US = convertUnemploymentDataToPaths(data4US, 29.7);
        savePathsData4US(paths4US)

    } catch(err){
        console.error(err);
    }
};

start();