import React, { useMemo } from 'react';

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

const unemploymentCategory = (rate: number): React.ReactNode => {
    if (rate < 4) {
        return (
            <>
                <ThemeText customLineHeight="1">indicative of an</ThemeText>
                <br />
                <ThemeText customLineHeight="1">Economic Boom</ThemeText>
            </>
        );
    }

    if (rate < 6) {
        return (
            <>
                <ThemeText customLineHeight="1">Healthy Levels</ThemeText>
                <br />
                <ThemeText customLineHeight="1">of Employment</ThemeText>
            </>
        );
    }

    return (
        <>
            <ThemeText customLineHeight="1">Recession Level</ThemeText>
            <br />
            <ThemeText customLineHeight="1">Unemployment</ThemeText>
        </>
    );
};

const getStatistics = (data: UnempolymentData) => {
    const { PctUnemployed } = data;

    let index4Low = 0;
    let idx4high = 0;

    for (let i = 0; i < PctUnemployed.length; i++) {
        if (PctUnemployed[i] > PctUnemployed[idx4high]) {
            idx4high = i;
        }

        if (PctUnemployed[i] < PctUnemployed[index4Low]) {
            index4Low = i;
        }
    }

    const lastMonth = PctUnemployed[PctUnemployed.length - 2];

    const lastYear = PctUnemployed[PctUnemployed.length - 13];

    const highest = PctUnemployed[idx4high];

    const lowest = PctUnemployed[index4Low];

    return [lastMonth, lastYear, highest, lowest];
};

const UnemploymentInfo: React.FC<Props> = ({ data }: Props) => {
    const [lastMonth, lastYear, highest, lowest] = useMemo(() => {
        return getStatistics(data);
    }, [data]);

    return (
        <div
            style={{
                marginRight: '4rem',
            }}
        >
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
                    <div
                        style={{
                            lineHeight: '1.2',
                            marginBottom: '.75rem',
                        }}
                    >
                        {unemploymentCategory(data.attributes.unemploymentRate)}
                    </div>

                    <div
                        style={{
                            lineHeight: '1.2',
                        }}
                    >
                        <ThemeText customLineHeight="1">
                            Rank #
                            {numberFns.numberWithCommas(data.attributes.rank)}
                        </ThemeText>
                        <br />
                        <ThemeText customLineHeight="1">
                            of 3,141 US Counties
                        </ThemeText>
                    </div>
                </div>
            </FlexContainer>

            <FlexContainer>
                <InfoTextWrap>
                    <InfoText title="Last Month" value={lastMonth.toString()} />
                </InfoTextWrap>

                <InfoTextWrap>
                    <InfoText title="Last Year" value={lastYear.toString()} />
                </InfoTextWrap>

                <InfoTextWrap>
                    <InfoText
                        title="14 Month HIGH"
                        value={highest.toString()}
                    />
                </InfoTextWrap>

                <InfoText title="14 Month LOW" value={lowest.toString()} />
            </FlexContainer>
        </div>
    );
};

export default UnemploymentInfo;
