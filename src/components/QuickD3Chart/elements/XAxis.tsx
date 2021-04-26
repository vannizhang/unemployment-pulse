import React, { useContext, useEffect } from 'react';

import { select, axisBottom, timeFormat, AxisScale } from 'd3';

import { SvgContainerData } from '../types';

import { AXIS_TEXT_COLOR, AXIS_LINE_COLOR } from '../constants';
import {
    AppContextValue,
    AppContext,
} from '../../../contexts/AppContextProvider';

type Props = {
    scale: AxisScale<string | number>;
    svgContainerData?: SvgContainerData;
    tickValues?: (string | number)[];
    timeFormatSpecifier?: string;
};

const YAxis: React.FC<Props> = ({
    scale,
    svgContainerData,
    tickValues,
    timeFormatSpecifier,
}: Props) => {
    // const containerGroup = useRef<SVGGElement>();

    const { months } = useContext<AppContextValue>(AppContext);

    const formatTime = timeFormatSpecifier
        ? timeFormat(timeFormatSpecifier)
        : null;

    const drawXAxis = () => {
        const { rootGroup, dimension } = svgContainerData;

        const { height } = dimension;

        let xAxisGenerator = null;

        xAxisGenerator = axisBottom(scale);

        if (tickValues) {
            xAxisGenerator.tickValues(tickValues);
        }

        if (formatTime) {
            xAxisGenerator.tickFormat((d: number) => {
                const date = new Date(+d);
                return formatTime(date);
            });
        }

        xAxisGenerator.tickFormat((d) => {
            const [month, year] = months[d].split(' ');
            const abbreviation = month.slice(0, 3);
            const formated = abbreviation === 'Jan' ? year : abbreviation;
            return formated;
        });

        const xAxisLabel = select(rootGroup).selectAll('.x.axis');

        if (!xAxisLabel.size()) {
            select(rootGroup)
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0,${height})`)
                .call(xAxisGenerator);

            const xAxisG = select(rootGroup).select('.x.axis');

            xAxisG
                .selectAll('.domain, .tick line')
                .attr('stroke', AXIS_LINE_COLOR);

            xAxisG.selectAll('.tick text').style('fill', AXIS_TEXT_COLOR);
        } else {
            xAxisLabel
                .attr('transform', `translate(0,${height})`)
                .call(xAxisGenerator);
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            drawXAxis();
        }
    }, [scale, svgContainerData]);

    return null;
};

export default YAxis;
