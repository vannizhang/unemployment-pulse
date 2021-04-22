import React from 'react';
import classnames from 'classnames';
// import styled from 'styled-components';

import { THEME_COLOR_ORANGE, THEME_COLOR_BLUE } from '../../constants/style';

type Props = {
    value: string;
    title: string;
};

type TextColor = 'orange' | 'blue';

type FontSizeClass =
    | 'font-size--3'
    | 'font-size--2'
    | 'font-size--1'
    | 'font-size-0'
    | 'font-size-1'
    | 'font-size-2'
    | 'font-size-3'
    | 'font-size-4';

type TextSize = 'small' | 'medium' | 'large' | 'default';

const FontSizeLookup: Record<TextSize, FontSizeClass> = {
    default: 'font-size-0',
    small: 'font-size--2',
    medium: 'font-size-2',
    large: 'font-size-4',
};

type TextProp = {
    color?: TextColor;
    size?: TextSize;
    children: React.ReactNode;
};

export const ThemeText: React.FC<TextProp> = ({
    color = 'blue',
    size = 'default',
    children,
}: TextProp) => {
    const fontSize = FontSizeLookup[size];

    const classNames = classnames(`avenir-bold ${fontSize}`, {
        'text-theme-color-orange': color === 'orange',
        'text-theme-color-blue': color === 'blue',
    });

    return <span className={classNames}>{children}</span>;
};

const InfoText: React.FC<Props> = ({ value, title }: Props) => {
    return (
        <div>
            <div>
                <ThemeText color="blue">{title}</ThemeText>
            </div>
            <div>
                <ThemeText color="orange" size="large">
                    {value}
                </ThemeText>
            </div>
        </div>
    );
};

export default InfoText;
