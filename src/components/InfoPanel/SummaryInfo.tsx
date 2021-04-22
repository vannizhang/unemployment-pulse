import React, { useMemo } from 'react';

import styled from 'styled-components';
import { UnempolymentData } from '../../../shared/types';
import InfoText, { ThemeText } from './InfoText';
import { numberFns } from 'helper-toolkit-ts';
import { SEPARATOR_COLOR } from '../../constants/style';

type Props = {
    data: UnempolymentData;
    // layout: InfoPanelLayout
};

const SummaryInfoContainer = styled.div``;

const SummaryInfo: React.FC<Props> = ({ data }: Props) => {
    const participationRate = useMemo(() => {
        return Math.floor(
            ((data.attributes.workforce - data.attributes.unemployed) /
                data.attributes.workforce) *
                100
        );
    }, [data]);

    return (
        <SummaryInfoContainer>
            <div className="trailer-half">
                <div>
                    <ThemeText color="orange" size="large">
                        {data.attributes.name}
                    </ThemeText>
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
                        title="Participation Rate"
                        value={`${participationRate}%`}
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
