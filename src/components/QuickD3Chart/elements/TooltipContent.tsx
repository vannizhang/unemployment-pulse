import React from 'react';

import {
    TOOLTIP_BACKGROUND_COLOR,
    TOOLTIP_TEXT_COLOR,
    TOOLTIP_PADDING,
} from '../constants';
import { QuickD3ChartDataItem } from '../types';

type Props = {
    index4ItemOnHover?: number;
    barDataOnHover?: QuickD3ChartDataItem;
    lineDataOnHover?: QuickD3ChartDataItem;
};

const TooltipContent: React.FC<Props> = ({
    index4ItemOnHover,
    barDataOnHover,
    lineDataOnHover,
}: Props) => {
    return (
        <div
            className="font-size--1 avenir-bold"
            style={{
                padding: TOOLTIP_PADDING,
                background: TOOLTIP_BACKGROUND_COLOR,
                color: TOOLTIP_TEXT_COLOR,
            }}
        >
            <div>
                {/* <span>{ barDataOnHover ? barDataOnHover.key : '' }</span>
                <br /> */}
                <span className="text-theme-color-orange">
                    Local: {barDataOnHover ? barDataOnHover.value : 'n/a'}%
                </span>
                <br />
                <span className="text-theme-color-blue">
                    National: {lineDataOnHover ? lineDataOnHover.value : 'n/a'}%
                </span>
            </div>
        </div>
    );
};

export default TooltipContent;
