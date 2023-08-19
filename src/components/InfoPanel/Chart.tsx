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

    return values.map((value, index) => {
        const tooltip = [
            `<div>`,
                `<span class="text-theme-color-orange">Local: ${value}</span>`,
                '<br />',
                `<span class="text-theme-color-blue">National: ${valueNationAve[index]}</span>`,
            `<div>`,
        ].join('')

        return {
            x: index,
            yBar: value,
            yLine: valueNationAve[index],
            tooltip
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
        return output
    }, [unemploymentDataByFIPS, data]);

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
            {/* <div
                className="text-right"
                style={{
                    position: 'absolute',
                    top: '.75rem',
                    right: '1rem',
                    padding: '.25rem',
                    pointerEvents: 'none',
                    zIndex: 5,
                    background: 'rgba(3,26,57, .4)',
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
            </div> */}

            <BarLineComboChart 
                data={chartData}
                fill={BAR_COLOR}
                strokeColor={LINE_COLOR}
                strokeWidth={LINE_WIDTH}
                innerPadding={0.8}
                showTooltip={true}
                bottomAxisOptions={{
                    tickFormatFunction: (val: number | string) => {

                        const [month, year] = months[val].split(' ');
                        const abbreviation = month.slice(0, 3);
                        const formated = abbreviation === 'Jan' ? year : abbreviation;
                        return formated;
                    }
                }}
            />
        </div>
    );
};

export default Chart;
