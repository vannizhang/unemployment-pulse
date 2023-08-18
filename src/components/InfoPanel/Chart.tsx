import React, { useContext, useMemo } from 'react';
import { UnempolymentData } from '../../../shared/types';
import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';

// import { BarLineCombined } from '../QuickD3Chart';
import { BarLineComboChart } from '@vannizhang/react-d3-charts'
import { ThemeText } from './InfoText';
import { AXIS_LINE_COLOR, AXIS_TEXT_COLOR, BAR_COLOR, LINE_COLOR, LINE_WIDTH, TOOLTIP_BACKGROUND_COLOR } from '../QuickD3Chart/constants';
import { BarLineComboChartDataItem } from '@vannizhang/react-d3-charts/dist/BarLineComboChart/types';

type Props = {
    data: UnempolymentData;
};

const getChartData = (values: number[], valueNationAve:number[]) => {

    console.log(values)
    console.log(valueNationAve)

    return values.map((value, index) => {
        return {
            x: index,
            yBar: value,
            yLine: valueNationAve[index],
            tooltip: `
                <div>
                    <span class="text-theme-color-orange">Local: ${value}</span>
                    <br />
                    <span class="text-theme-color-blue">National: ${valueNationAve[index]}</span>
                <div>
            `
        } as BarLineComboChartDataItem;
    });
};

const Chart: React.FC<Props> = ({ data }: Props) => {
    const { unemploymentDataByFIPS, months } = useContext<AppContextValue>(
        AppContext
    );

    const chartData = useMemo(() => {
        const USData = unemploymentDataByFIPS['0'];
        const { PctUnemployed } = data;
        const output = getChartData(PctUnemployed, USData.PctUnemployed);
        console.log(output)

        return output
    }, [unemploymentDataByFIPS]);

    return (
        <div
            style={{
                position: 'relative',
                flexGrow: 1,
                '--axis-tick-line-color': AXIS_LINE_COLOR,
                '--axis-tick-text-color': AXIS_TEXT_COLOR,
                '--tooltip-background-color': TOOLTIP_BACKGROUND_COLOR,
                '--tooltip-text-font-size': '.8rem'
            } as React.CSSProperties}
        >
            <div
                className="text-right"
                style={{
                    position: 'absolute',
                    top: '.75rem',
                    right: '1rem',
                }}
            >
                <ThemeText color="orange" size="small">
                    Local Unemployment
                </ThemeText>
                <br />
                <ThemeText color="blue" size="small">
                    National Unemployment
                </ThemeText>
                <br />
                <ThemeText color="blue">
                    {chartData ? chartData[chartData.length - 1].yLine : ''}%
                </ThemeText>
            </div>

            <BarLineComboChart 
                data={chartData}
                fill={BAR_COLOR}
                strokeColor={LINE_COLOR}
                strokeWidth={LINE_WIDTH}
                innerPadding={0.8}
                showTooltip={true}
                bottomAxisOptions={{
                    // tickFormatFunction: (val: number | string) => {

                    //     if(typeof val === 'number'){
                    //         val = val.toString();
                    //     }
                
                    //     const [month, day] = val.split('/');
                    //     return `${month}-${day}`;
                    // }
                }}
            />
        </div>
    );
};

export default Chart;
