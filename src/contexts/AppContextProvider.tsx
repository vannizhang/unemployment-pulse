import React, { useState, createContext } from 'react';
import axios from 'axios';

import {
    MonthlyUmempolymentDataPaths,
    UnempolymentDataByFIPS,
} from '../../shared/types';

import {
    UNEMPLOYMENT_PATHS_COUNTIES_FILE_NAME,
    UNEMPLOYMENT_PATHS_STATES_FILE_NAME,
    UNEMPLOYMENT_PATHS_US_FILE_NAME,
    UNEMPLOYMENT_DATA_FILE_NAME,
} from '../../shared/constants';
import { queryMonths } from '../services/monthly-unemployment-data';

import { miscFns } from 'helper-toolkit-ts';

export type AppContextValue = {
    unemploymentDataPathsUS: MonthlyUmempolymentDataPaths;
    unemploymentDataPathsStates: MonthlyUmempolymentDataPaths;
    unemploymentDataPathsCounties: MonthlyUmempolymentDataPaths;
    unemploymentDataByFIPS: UnempolymentDataByFIPS;
    months: string[];
    isMobileDevice?: boolean;
};

type AppContextProviderProps = {
    children?: React.ReactNode;
};

export const AppContext = createContext<AppContextValue>(null);

const fetchDataFromPublicFolder = async <T extends unknown>(
    filename: string
): Promise<T> => {
    const PUBLIC_PATH = './public';

    try {
        const { data } = await axios.get<T>(`${PUBLIC_PATH}/${filename}`);
        return data;
    } catch (err) {
        console.error(err);
    }

    return null;
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
}: AppContextProviderProps) => {
    const [value, setValue] = useState<AppContextValue>();

    const loadAppData = async () => {
        try {
            const unemploymentDataPathsStates = await fetchDataFromPublicFolder<
                MonthlyUmempolymentDataPaths
            >(UNEMPLOYMENT_PATHS_STATES_FILE_NAME);

            const unemploymentDataPathsCounties = await fetchDataFromPublicFolder<
                MonthlyUmempolymentDataPaths
            >(UNEMPLOYMENT_PATHS_COUNTIES_FILE_NAME);

            const unemploymentDataPathsUS = await fetchDataFromPublicFolder<
                MonthlyUmempolymentDataPaths
            >(UNEMPLOYMENT_PATHS_US_FILE_NAME);

            const unemploymentDataByFIPS = await fetchDataFromPublicFolder<
                UnempolymentDataByFIPS
            >(UNEMPLOYMENT_DATA_FILE_NAME);

            const months = await queryMonths();

            setValue({
                unemploymentDataPathsStates,
                unemploymentDataPathsCounties,
                unemploymentDataPathsUS,
                unemploymentDataByFIPS,
                months,
                isMobileDevice: miscFns.isMobileDevice(),
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
