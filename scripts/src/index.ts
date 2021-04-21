import {
    fecthData4States,
    fetchData4Counties,
    addDeviationData
} from './donwload-data';

import {
    savePathsData4States,
    savePathsData4Counties,
    savePathsData4US,
    // saveUnempolymentDataByFIPS
} from './utils/file';

import {
    convertUnemploymentDataToPaths
} from './calculatePaths';

import {
    saveUnemploymentData
} from './saveUnempolymentData2JSON'

import {
    downloadACSData
} from './getPopulationData'

const start = async()=>{

    try {
        // download total population data for each state and county
        await downloadACSData();

        const data4US = await fecthData4States(true);

        // fetch data from ArcGIS Online Hosted feature service
        let data4States = await fecthData4States();
        data4States = addDeviationData(data4States, data4US);

        let data4Counties = await fetchData4Counties();
        data4Counties = addDeviationData(data4Counties, data4US);

        saveUnemploymentData([
            ...data4US.data,
            ...data4States.data,
            ...data4Counties.data
        ])

        const paths4States = convertUnemploymentDataToPaths(data4States);
        savePathsData4States(paths4States)
        // const data4counties = await fetchData4Counties();

        const paths4Counties = convertUnemploymentDataToPaths(data4Counties);
        savePathsData4Counties(paths4Counties);

        const paths4US = convertUnemploymentDataToPaths(data4US, data4States.maxPctUnemployed);
        savePathsData4US(paths4US)

    } catch(err){
        console.error(err);
    }
};

start();