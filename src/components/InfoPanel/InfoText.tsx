import React from 'react';
import classnames from 'classnames';
// import styled from 'styled-components';

import { THEME_COLOR_ORANGE, THEME_COLOR_BLUE } from '../../constants/style';

type Props = {
    value: string;
    title: string;
    subtitle?: string;
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
    customFontSize?: string;
    customLineHeight?: string;
    children: React.ReactNode;
};

export const ThemeText: React.FC<TextProp> = ({
    color = 'blue',
    size = 'default',
    customFontSize,
    customLineHeight,
    children,
}: TextProp) => {
    const fontSize = !customFontSize ? FontSizeLookup[size] : '';

    const classNames = classnames(`avenir-bold ${fontSize}`, {
        'text-theme-color-orange': color === 'orange',
        'text-theme-color-blue': color === 'blue',
    });

    const style: React.CSSProperties =
        customFontSize || customLineHeight
            ? {
                  fontSize: customFontSize || 'default',
                  lineHeight: customLineHeight || 'default',
              }
            : null;

    return (
        <span className={classNames} style={style}>
            {children}
        </span>
    );
};

const InfoText: React.FC<Props> = ({ value, title, subtitle }: Props) => {
    return (
        <div className="trailer-quarter">
            <div>
                <ThemeText color="blue">{title}</ThemeText>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                }}
            >
                <ThemeText color="orange" size="large" customLineHeight="1">
                    {value}
                </ThemeText>

                {subtitle ? (
                    <div className="margin-left-quarter">
                        <ThemeText
                            color="orange"
                            size="small"
                            customLineHeight="1"
                        >
                            {subtitle}
                        </ThemeText>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default InfoText;
