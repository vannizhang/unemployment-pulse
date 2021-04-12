import React, { useState, createContext } from 'react';
import axios from 'axios';

import { MonthlyUmempolymentDataPaths } from '../../shared/types';

import {
    UNEMPLOYMENT_PATHS_COUNTIES_FILE_NAME,
    UNEMPLOYMENT_PATHS_STATES_FILE_NAME,
    UNEMPLOYMENT_PATHS_US_FILE_NAME,
} from '../../shared/constants';

export type AppContextValue = {
    unemploymentDataPathsUS: MonthlyUmempolymentDataPaths;
    unemploymentDataPathsStates: MonthlyUmempolymentDataPaths;
    unemploymentDataPathsCounties?: MonthlyUmempolymentDataPaths;
};

type AppContextProviderProps = {
    children?: React.ReactNode;
};

export const AppContext = createContext<AppContextValue>(null);

const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
}: AppContextProviderProps) => {
    const [value, setValue] = useState<AppContextValue>();

    const loadAppData = async () => {
        try {
            const resUmempolymentDataPaths4States = await axios.get<
                MonthlyUmempolymentDataPaths
            >(`./public/${UNEMPLOYMENT_PATHS_STATES_FILE_NAME}`);

            const resUmempolymentDataPaths4Counties = await axios.get<
                MonthlyUmempolymentDataPaths
            >(`./public/${UNEMPLOYMENT_PATHS_COUNTIES_FILE_NAME}`);

            const resUmempolymentDataPaths4US = await axios.get<
                MonthlyUmempolymentDataPaths
            >(`./public/${UNEMPLOYMENT_PATHS_US_FILE_NAME}`);

            setValue({
                unemploymentDataPathsStates:
                    resUmempolymentDataPaths4States.data,
                unemploymentDataPathsCounties:
                    resUmempolymentDataPaths4Counties.data,
                unemploymentDataPathsUS: resUmempolymentDataPaths4US.data,
            });
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        loadAppData();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {value ? children : null}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
