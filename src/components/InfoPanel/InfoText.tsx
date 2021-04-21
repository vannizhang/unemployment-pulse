import React from 'react';
import styled from 'styled-components';

import { THEME_COLOR_ORANGE, THEME_COLOR_BLUE } from '../../constants/style';

type Props = {
    value: string;
    title: string;
    fontSize4ValueText?: number;
};

const InfoText: React.FC<Props> = ({
    value,
    title,
    fontSize4ValueText,
}: Props) => {
    return (
        <div>
            <div>
                <span className="avenir-bold font-size-0 text-theme-color-blue">
                    {title}
                </span>
            </div>
            <div>
                <span className="avenir-bold font-size-4 text-theme-color-orange">
                    {value}
                </span>
            </div>
        </div>
    );
};

export default InfoText;
