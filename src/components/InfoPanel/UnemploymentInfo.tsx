import React from 'react';

import { UnempolymentData } from '../../../shared/types';
import InfoText, { ThemeText } from './InfoText';

import styled from 'styled-components';
import { numberFns } from 'helper-toolkit-ts';
import { SEPARATOR_COLOR } from '../../constants/style';

const FlexContainer = styled.div`
    display: flex;
`;

const InfoTextWrap = styled.div`
    border-right: 1px solid ${SEPARATOR_COLOR};
    width: 120px;
    padding-right: 0.75rem;
    margin-right: 1rem;
`;

type Props = {
    data: UnempolymentData;
    // layout: InfoPanelLayout
};

const UnemploymentInfo: React.FC<Props> = ({ data }: Props) => {
    return (
        <div>
            <div>
                <ThemeText>Unemployment Rate</ThemeText>
            </div>

            <FlexContainer>
                <div
                    style={{
                        lineHeight: '1.1',
                        marginRight: '2rem',
                    }}
                >
                    <ThemeText color="orange" customFontSize="7rem">
                        {data.attributes.unemploymentRate}%
                    </ThemeText>
                </div>

                <div
                    style={{
                        maxWidth: 170,
                    }}
                >
                    <div className="trailer-quarter">
                        <ThemeText>Recession Level Unemployment</ThemeText>
                    </div>

                    <div>
                        <ThemeText>
                            Rank #
                            {numberFns.numberWithCommas(data.attributes.rank)}
                        </ThemeText>
                        <br />
                        <ThemeText>of 3,141 US Counties</ThemeText>
                    </div>
                </div>
            </FlexContainer>

            <FlexContainer>
                <InfoTextWrap>
                    <InfoText title="Last Month" value="14.1" />
                </InfoTextWrap>

                <InfoTextWrap>
                    <InfoText title="Last Year" value="22.1" />
                </InfoTextWrap>

                <InfoTextWrap>
                    <InfoText title="14 Month HIGH" value="24.2" />
                </InfoTextWrap>

                <InfoText title="14 Month LOW" value="9.6" />
            </FlexContainer>
        </div>
    );
};

export default UnemploymentInfo;
