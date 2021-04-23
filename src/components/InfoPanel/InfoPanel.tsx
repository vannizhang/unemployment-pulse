import React from 'react';

import styled from 'styled-components';
import { UnempolymentData } from '../../../shared/types';

import SummaryInfo from './SummaryInfo';
import UnemploymentInfo from './UnemploymentInfo';
import Chart from './Chart';

import { PANEL_BACKGROUND } from '../../constants/style';

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
`;

type Props = {
    data: UnempolymentData;
    // layout: InfoPanelLayout
};

const InfoPanel: React.FC<Props> = ({ data }: Props) => {
    return data ? (
        <InfoPanelContainer>
            <SummaryInfo data={data} />
            <UnemploymentInfo data={data} />
            <Chart data={data} />
        </InfoPanelContainer>
    ) : null;
};

export default InfoPanel;
