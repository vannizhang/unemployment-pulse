import React, { useContext, useMemo } from 'react';

import { UnempolymentData } from '../../../shared/types';
import InfoText, { ThemeText } from './InfoText';

import styled from 'styled-components';
import { numberFns } from 'helper-toolkit-ts';
import { SEPARATOR_COLOR, BREAKPOINT_SMALL } from '../../constants/style';
import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';

const UnemploymentInfoContainer = styled.div`
    margin-right: 4rem;

    @media (max-width: ${BREAKPOINT_SMALL}px) {
        margin-right: unset;
        margin: 1rem 0;
        padding: 1rem 0;
        border-top: 1px solid ${SEPARATOR_COLOR};
        border-bottom: 1px solid ${SEPARATOR_COLOR};
    }
`;

const UnemploymentRateTextWrap = styled.div`
    line-height: 1.1;
    margin-right: 2rem;

    @media (max-width: ${BREAKPOINT_SMALL}px) {
        margin-right: 0.75rem;
    }
`;

const StatisticsInfoContainer = styled.div`
    display: flex;

    @media (max-width: ${BREAKPOINT_SMALL}px) {
        flex-wrap: wrap;
    }
`;

const InfoTextWrap = styled.div`
    border-right: 1px solid ${SEPARATOR_COLOR};
    min-width: 85px;
    padding-right: 0.75rem;
    margin-right: 1rem;

    @media (max-width: ${BREAKPOINT_SMALL}px) {
        border-right: none;
        width: 45%;
        padding-right: 0.25rem;
        margin-right: 0.25rem;
    }
`;

type Props = {
    data: UnempolymentData;
    // layout: InfoPanelLayout
};

type STATS_DATA = {
    month: string;
    value: number;
};

const UnemploymentInfo: React.FC<Props> = ({ data }: Props) => {
    const { months, isMobileDevice } = useContext<AppContextValue>(AppContext);

    const [lastMonth, lastYear, lowest, highest] = useMemo(() => {
        return getStatistics(data, months);
    }, [data]);

    return (
        <UnemploymentInfoContainer>
            <div>
                <ThemeText>Unemployment Rate</ThemeText>
            </div>

            <div
                style={{
                    display: 'flex',
                    marginBottom: isMobileDevice ? '1rem' : 'unset',
                }}
            >
                <UnemploymentRateTextWrap>
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <ThemeText
                            color="orange"
                            customFontSize={isMobileDevice ? '5rem' : '7rem'}
                        >
                            {data.attributes.unemploymentRate}
                        </ThemeText>

                        <span className="leader-half">
                            <ThemeText
                                color="orange"
                                customFontSize={
                                    isMobileDevice ? '2rem' : '4rem'
                                }
                            >
                                %
                            </ThemeText>
                        </span>
                    </div>
                </UnemploymentRateTextWrap>

                <div
                    style={{
                        maxWidth: 170,
                    }}
                >
                    <div
                        style={{
                            lineHeight: '1.2',
                            marginTop: '.75rem',
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
                            Ranks #
                            {numberFns.numberWithCommas(data.attributes.rank)}
                        </ThemeText>
                        <br />
                        <ThemeText customLineHeight="1">
                            {data.attributes.fips.length === 2
                                ? 'of 50 States and DC'
                                : 'of 3,141 Counties'}
                        </ThemeText>
                    </div>
                </div>
            </div>

            <StatisticsInfoContainer>
                <InfoTextWrap>
                    <InfoText
                        title="Last Month"
                        value={lastMonth.value.toString()}
                    />
                </InfoTextWrap>

                <InfoTextWrap>
                    <InfoText
                        title="Last Year"
                        value={lastYear.value.toString()}
                    />
                </InfoTextWrap>

                <InfoTextWrap>
                    <InfoText
                        title="14-Month HIGH"
                        subtitle={highest.month}
                        value={highest.value.toString()}
                    />
                </InfoTextWrap>

                <InfoText
                    title="14-Month LOW"
                    subtitle={lowest.month}
                    value={lowest.value.toString()}
                />
            </StatisticsInfoContainer>
        </UnemploymentInfoContainer>
    );
};

const getStatistics = (
    data: UnempolymentData,
    months: string[]
): STATS_DATA[] => {
    const { PctUnemployed } = data;

    const idx4lastMonth = PctUnemployed.length - 2;
    // last year this month
    const idx4LastYear = PctUnemployed.length - 13;
    // 14 month low
    let index4LowesetMonth = 0;
    // 14 month high
    let idx4highestMonth = 0;

    for (let i = 0; i < PctUnemployed.length; i++) {
        if (PctUnemployed[i] > PctUnemployed[idx4highestMonth]) {
            idx4highestMonth = i;
        }

        if (PctUnemployed[i] < PctUnemployed[index4LowesetMonth]) {
            index4LowesetMonth = i;
        }
    }

    return [
        idx4lastMonth,
        idx4LastYear,
        index4LowesetMonth,
        idx4highestMonth,
    ].map((idx) => {
        const value = PctUnemployed[idx];
        const [month, year] = months[idx].split(' ');
        const formatedMonth = `${month.slice(0, 3).toUpperCase()} '${year.slice(
            2
        )}`;

        return {
            month: formatedMonth,
            value,
        };
    });
};

const unemploymentCategory = (rate: number): React.ReactNode => {
    if (rate < 4) {
        return (
            <>
                <ThemeText customLineHeight="1">Indicative of an</ThemeText>
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

export default UnemploymentInfo;
