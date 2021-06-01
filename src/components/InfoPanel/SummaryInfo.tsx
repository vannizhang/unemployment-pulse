import React, { useMemo } from 'react';

import styled from 'styled-components';
import { UnempolymentData } from '../../../shared/types';
import InfoText, { ThemeText } from './InfoText';
import { numberFns } from 'helper-toolkit-ts';
import { SEPARATOR_COLOR, THEME_COLOR_BLUE } from '../../constants/style';

type Props = {
    data: UnempolymentData;
    // layout: InfoPanelLayout
};

const SummaryInfoContainer = styled.div`
    margin-right: 2rem;
    width: 380px;

    svg {
        fill: ${THEME_COLOR_BLUE};
        stroke: ${THEME_COLOR_BLUE};
    }
`;

const SummaryInfo: React.FC<Props> = ({ data }: Props) => {
    const employmentRate = useMemo(() => {
        return (
            ((data.attributes.workforce - data.attributes.unemployed) /
                data.attributes.workforce) *
            100
        ).toFixed(1);
    }, [data]);

    return (
        <SummaryInfoContainer>
            <div className="trailer-half">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                    }}
                >
                    <ThemeText color="orange" size="large">
                        {data.attributes.name}
                    </ThemeText>

                    <a
                        className="margin-left-quarter leader-quarter"
                        rel="noreferrer"
                        target="_blank"
                        href={`https://www.google.com/search?q=${data.attributes.name}+economy`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            height="16"
                            width="16"
                        >
                            <path d="M14.482 13.784L9.708 9.011a4.8 4.8 0 1 0-.69.69l4.773 4.773zM3.315 8.687a3.8 3.8 0 1 1 2.687 1.112 3.806 3.806 0 0 1-2.687-1.112z" />
                        </svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24"><path d="M21.995 21.288L15 14.291a7.317 7.317 0 1 0-.708.708l6.997 6.996zM9.5 15.8a6.3 6.3 0 1 1 6.3-6.3 6.307 6.307 0 0 1-6.3 6.3z"/><path fill="none" d="M0 0h24v24H0z"/></svg> */}
                    </a>
                </div>

                <div className="avenir-bold font-size-0">
                    <ThemeText color="orange">
                        {numberFns.numberWithCommas(data.attributes.population)}
                    </ThemeText>{' '}
                    <ThemeText>Total population</ThemeText>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                }}
            >
                <div
                    className="padding-right-1"
                    style={{
                        borderRight: `1px solid ${SEPARATOR_COLOR}`,
                    }}
                >
                    <InfoText
                        title="Labor Force"
                        value={numberFns.numberWithCommas(
                            data.attributes.workforce
                        )}
                    />

                    <InfoText
                        title="Employment Rate"
                        value={`${employmentRate}%`}
                    />
                </div>

                <div className="margin-left-1">
                    <InfoText
                        title="Employed"
                        value={numberFns.numberWithCommas(
                            data.attributes.workforce -
                                data.attributes.unemployed
                        )}
                    />

                    <InfoText
                        title="Unemployed"
                        value={numberFns.numberWithCommas(
                            data.attributes.unemployed
                        )}
                    />
                </div>
            </div>
        </SummaryInfoContainer>
    );
};

export default SummaryInfo;
