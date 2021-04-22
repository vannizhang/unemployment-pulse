import React, { useContext, useMemo } from 'react';
import { UnempolymentData } from '../../../shared/types';
import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';

import { BarLineCombined } from '../QuickD3Chart';

import { QuickD3ChartData, QuickD3ChartDataItem } from '../QuickD3Chart/types';
import { ThemeText } from './InfoText';

type Props = {
    data: UnempolymentData;
};

const getChartData = (values: number[], months: string[]) => {
    return values.map((value, index) => {
        return {
            key: index,
            value,
        };
    });
};

const Chart: React.FC<Props> = ({ data }: Props) => {
    const { unemploymentDataByFIPS, months } = useContext<AppContextValue>(
        AppContext
    );

    const data4Line: QuickD3ChartData = useMemo(() => {
        const USData = unemploymentDataByFIPS['0'];
        const { PctUnemployed } = USData;
        return getChartData(PctUnemployed, months);
    }, [unemploymentDataByFIPS]);

    const data4Bars: QuickD3ChartData = useMemo(() => {
        const { PctUnemployed } = data;
        return getChartData(PctUnemployed, months);
    }, [data]);

    return (
        <div
            style={{
                position: 'relative',
                flexGrow: 1,
            }}
        >
            <div
                className="text-right"
                style={{
                    position: 'absolute',
                    top: '.25rem',
                    right: '.25rem',
                }}
            >
                <ThemeText color="orange">Local Unemployment</ThemeText>
                <br />
                <ThemeText color="blue">National Unemployment</ThemeText>
            </div>
            <BarLineCombined data4Bars={data4Bars} data4Line={data4Line} />
        </div>
    );
};

export default Chart;
