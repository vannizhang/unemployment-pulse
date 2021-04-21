import React, { useMemo } from 'react';

import styled from 'styled-components';
import { UnempolymentData } from '../../../shared/types';
import InfoText from './InfoText';
import { numberFns } from 'helper-toolkit-ts';
import { BORDER_COLOR } from '../../constants/style';

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
                    <span className="avenir-bold font-size-3 text-theme-color-orange">
                        {data.attributes.name}
                    </span>
                </div>

                <div className="avenir-bold font-size-0">
                    <span className="text-theme-color-orange">
                        {numberFns.numberWithCommas(data.attributes.population)}
                    </span>{' '}
                    <span className="text-theme-color-blue">
                        Total population
                    </span>
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
                        borderRight: `1px solid ${BORDER_COLOR}`,
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
