import React from 'react';
// import styled from 'styled-components';
// import { THEME_COLOR_BLUE } from '../../constants/style';
import { Modal } from '../';
import { Props } from '../Modal/Modal';

// type Props = {
//     isActive: boolean;
//     onClose: () => void;
// };

const About: React.FC<Props> = ({ isActive, onClose }: Props) => {
    return (
        <Modal isActive={isActive} onClose={onClose}>
            <div>
                <p>
                    <span className="text-theme-color-orange">
                        UnemploymentPulse
                    </span>{' '}
                    visualizes a moving 14-month window of unemployment data at
                    the state and county level, as reported by the Bureau of
                    Labor and Statistics. Local rates are shown alongside
                    national rate.
                </p>

                <p>
                    There are two options for visualizing these trends. The
                    first shows local rates of unemployment alongside national
                    rates, for context. The second option shows when local rates
                    went above or below the national rate.
                </p>

                <p>
                    UnemploymentPulse is a collaboration of architect{' '}
                    <a
                        rel="noreferrer"
                        href="https://github.com/vannizhang"
                        target="_blank"
                    >
                        Jinnan Zhang
                    </a>
                    , demographer{' '}
                    <a
                        rel="noreferrer"
                        href="https://www.esri.com/arcgis-blog/author/dianaclavery_global/"
                        target="_blank"
                    >
                        Diana Lavery
                    </a>
                    , and cartographer{' '}
                    <a
                        rel="noreferrer"
                        href="https://adventuresinmapping.com/"
                        target="_blank"
                    >
                        John Nelson
                    </a>
                    , members of the Esri Living Atlas team. The Living Atlas is
                    a repository of curated geographic data from all sectors of
                    the mapping community. Find more BLS-related resources{' '}
                    <a
                        rel="noreferrer"
                        href="https://livingatlas.arcgis.com/en/browse/#d=2&q=Bureau%20of%20Labor%20Statistics"
                        target="_blank"
                    >
                        here
                    </a>
                    .
                </p>
            </div>
        </Modal>
    );
};

export default About;
