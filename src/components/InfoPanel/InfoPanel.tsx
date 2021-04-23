import React from 'react';

import styled from 'styled-components';
import { UnempolymentData } from '../../../shared/types';

import SummaryInfo from './SummaryInfo';
import UnemploymentInfo from './UnemploymentInfo';
import Chart from './Chart';

import {
    PANEL_BACKGROUND,
    THEME_COLOR_BLUE,
    BREAKPOINT_SMALL,
} from '../../constants/style';

const InfoPanelContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 250px;
    display: flex;
    box-sizing: border-box;
    background-color: ${PANEL_BACKGROUND};
    padding: 1rem 2rem;
    box-shadow: 0 0 10px 2px #156aa4;
    z-index: 5;

    @media (max-width: ${BREAKPOINT_SMALL}px) {
        top: 0;
        bottom: 0;
        height: unset;
        flex-direction: column;
        overflow-y: auto;
    }
`;

const CloseBtnDiv = styled.div`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;

    svg {
        stroke: ${THEME_COLOR_BLUE};
        fill: ${THEME_COLOR_BLUE};
    }
`;

type Props = {
    data: UnempolymentData;
    close: () => void;
    // layout: InfoPanelLayout
};

const InfoPanel: React.FC<Props> = ({ data, close }: Props) => {
    return data ? (
        <InfoPanelContainer>
            <SummaryInfo data={data} />
            <UnemploymentInfo data={data} />
            <Chart data={data} />

            <CloseBtnDiv onClick={close}>
                <svg height="32" width="32" viewBox="0 0 32 32" className="">
                    <path d="M23.985 8.722L16.707 16l7.278 7.278-.707.707L16 16.707l-7.278 7.278-.707-.707L15.293 16 8.015 8.722l.707-.707L16 15.293l7.278-7.278z" />
                </svg>
            </CloseBtnDiv>
        </InfoPanelContainer>
    ) : null;
};

export default InfoPanel;
