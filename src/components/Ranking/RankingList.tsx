import React from 'react';
import { RankingData } from './Ranking';
import { ThemeText } from '../InfoPanel/InfoText';
import { UnempolymentData } from '../../../shared/types';

type Props = {
    rankingData: RankingData;
    label: string;
    onClick: (fips: string) => void;
};

const RankingList: React.FC<Props> = ({
    rankingData,
    label,
    onClick,
}: Props) => {
    const getList = (data: UnempolymentData[]) => {
        const list = data.map((d) => {
            return (
                <div
                    key={d.attributes.fips}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                    }}
                    onClick={onClick.bind(this, d.attributes.fips)}
                >
                    <ThemeText color="blue" size="small">
                        {d.attributes.name}
                    </ThemeText>

                    <ThemeText color="blue" size="small">
                        {d.attributes.unemploymentRate}%
                    </ThemeText>
                </div>
            );
        });

        return <div>{list}</div>;
    };

    return rankingData ? (
        <div
            style={{
                margin: '0 1.5rem',
            }}
        >
            <div className="trailer-half">
                <ThemeText size="medium" color="orange">
                    {label}
                </ThemeText>
            </div>

            <div className="trailer-quarter">
                <div>
                    <ThemeText size="small" color="orange">
                        Highest Unemployment
                    </ThemeText>
                </div>

                {getList(rankingData.highest)}
            </div>

            <div>
                <div>
                    <ThemeText size="small" color="orange">
                        Lowest Unemployment
                    </ThemeText>
                </div>

                {getList(rankingData.lowest)}
            </div>
        </div>
    ) : null;
};

export default RankingList;
