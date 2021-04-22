import React, { useContext, useMemo } from 'react';
import { UnempolymentData } from '../../../shared/types';
import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';

import { BarLineCombined } from '../QuickD3Chart';

import { QuickD3ChartData, QuickD3ChartDataItem } from '../QuickD3Chart/types';

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
                flexGrow: 1,
            }}
        >
            <BarLineCombined data4Bars={data4Bars} data4Line={data4Line} />
        </div>
    );
};

export default Chart;
