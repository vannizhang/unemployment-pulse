import React from 'react';

import styled from 'styled-components';
import { ThemeText } from '../InfoPanel/InfoText';
import { SparklineLayerSwitcher } from '../';

import {
    PANEL_BACKGROUND,
    THEME_COLOR_BLUE,
    BREAKPOINT_SMALL,
} from '../../constants/style';

type Props = {
    children: React.ReactNode;
};

const HeaderContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    background: linear-gradient(
        to bottom,
        ${PANEL_BACKGROUND} 0%,
        ${PANEL_BACKGROUND} 50%,
        rgba(0, 0, 0, 0) 100%
    );
    z-index: 5;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    justify-content: space-between;

    svg {
        fill: ${THEME_COLOR_BLUE};
        stroke: ${THEME_COLOR_BLUE};
    }
`;

const AppTitle = styled.div`
    margin-right: 0.5rem;

    @media (max-width: 826px) {
        display: none;
    }
`;

const SubTitle = styled.div`
    margin: 0 0.5rem;
    line-height: 1.2;

    @media (max-width: 1113px) {
        display: none;
    }
`;

const Title = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <AppTitle>
                <ThemeText size="large" color="orange">
                    UnemploymentPulse
                </ThemeText>
            </AppTitle>

            <SubTitle
                className="margin-left-1 margin-right-1"
                style={{
                    lineHeight: '1.2',
                }}
            >
                <ThemeText
                    // size='large'
                    color="blue"
                    customLineHeight="1"
                >
                    14-Month US State and County
                </ThemeText>

                <br />

                <ThemeText
                    // size='large'
                    color="blue"
                    customLineHeight="1"
                >
                    Unemployment Trend Lines
                </ThemeText>
            </SubTitle>

            <div
                className="leader-quarter"
                style={{
                    cursor: 'pointer',
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                >
                    <path d="M12.5 7.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1zM13 18V9h-2v1h1v8h-1v1h3v-1zm9.8-5.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z" />
                </svg>
            </div>
        </div>
    );
};

const Header: React.FC<Props> = ({ children }: Props) => {
    return (
        <HeaderContainer>
            <Title />

            {children}
        </HeaderContainer>
    );
};

export default Header;
