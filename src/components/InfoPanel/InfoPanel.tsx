import React from 'react';

import styled from 'styled-components';
import { UnempolymentData } from '../../../shared/types';

import SummaryInfo from './SummaryInfo';
import UnemploymentInfo from './UnemploymentInfo';

const InfoPanelContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /* height: 250px; */
    display: flex;
    box-sizing: border-box;
    background-color: rgba(0, 35, 72, 0.8);
    padding: 1rem 2rem;
`;

type Props = {
    data: UnempolymentData;
    // layout: InfoPanelLayout
};

const InfoPanel: React.FC<Props> = ({ data }: Props) => {
    return data ? (
        <InfoPanelContainer>
            <SummaryInfo data={data} />
            <UnemploymentInfo />
        </InfoPanelContainer>
    ) : null;
};

export default InfoPanel;
