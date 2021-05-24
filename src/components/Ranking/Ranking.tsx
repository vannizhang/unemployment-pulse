import React, { useContext, useMemo } from 'react';
import { Modal } from '../';
import { Props } from '../Modal/Modal';
import RankingList from './RankingList';

import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';
import {
    UnempolymentData,
    UnempolymentDataByFIPS,
} from '../../../shared/types';

export type RankingData = {
    highest: UnempolymentData[];
    lowest: UnempolymentData[];
};

const getRankingData = (
    data: UnempolymentDataByFIPS,
    fips: string[],
    num = 10
): RankingData => {
    const sorted = fips
        .sort((fipsA, fipsB) => {
            return (
                data[fipsB].attributes.unemploymentRate -
                data[fipsA].attributes.unemploymentRate
            );
        })
        .map((fips) => data[fips]);

    const highest = sorted.slice(0, num);

    const lowest = sorted.slice(sorted.length - num, sorted.length).reverse();

    return {
        highest,
        lowest,
    };
};

const Ranking: React.FC<Props> = ({ isActive, onClose }: Props) => {
    const { unemploymentDataByFIPS } = useContext<AppContextValue>(AppContext);

    const rankingData4States = useMemo(() => {
        if (!unemploymentDataByFIPS) {
            return null;
        }

        const fipsCodes = Object.keys(unemploymentDataByFIPS);

        const stateFIPS = fipsCodes.filter((fips) => fips.length === 2);

        return getRankingData(unemploymentDataByFIPS, stateFIPS);
    }, [unemploymentDataByFIPS]);

    const rankingData4Counties = useMemo(() => {
        if (!unemploymentDataByFIPS) {
            return null;
        }

        const fipsCodes = Object.keys(unemploymentDataByFIPS);

        const countyFIPS = fipsCodes.filter((fips) => fips.length === 5);

        return getRankingData(unemploymentDataByFIPS, countyFIPS);
    }, [unemploymentDataByFIPS]);

    const getContent = () => {
        if (!rankingData4States || !rankingData4Counties) {
            return null;
        }

        return (
            <div
                style={{
                    display: 'flex',
                }}
            >
                <RankingList
                    rankingData={rankingData4States}
                    label="50 States and DC"
                />

                <RankingList
                    rankingData={rankingData4Counties}
                    label="3,141 Counties"
                />
            </div>
        );
    };

    return (
        <Modal isActive={isActive} onClose={onClose}>
            {getContent()}
        </Modal>
    );
};

export default Ranking;
