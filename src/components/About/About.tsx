import React from 'react';
import styled from 'styled-components';
import { THEME_COLOR_ORANGE } from '../../constants/style';
import { Modal } from '../';
import { Props } from '../Modal/Modal';

// type Props = {
//     isActive: boolean;
//     onClose: () => void;
// };

const AboutContent = styled.div`
    a {
        color: ${THEME_COLOR_ORANGE};
    }
`;

const About: React.FC<Props> = ({ isActive, onClose }: Props) => {
    return (
        <Modal isActive={isActive} onClose={onClose}>
            <AboutContent>
                <p>
                    <span className="text-theme-color-orange">
                        UnemploymentPulse
                    </span>{' '}
                    visualizes a moving 14-month window of unemployment data at
                    the state and county level, as reported by the{' '}
                    <a
                        href="https://www.bls.gov/cps/definitions.htm#lfconcepts"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Bureau of Labor and Statistics
                    </a>{' '}
                    (monthly report, generally released with about a six-week
                    lag). Local rates are shown alongside national rates.
                </p>

                <p>
                    There are two options for visualizing these trends. The
                    first shows local rates of unemployment alongside national
                    rates, for context. The second option shows when local rates
                    went above or below the national rate.
                </p>

                <p>
                    <span>
                        <a
                            href="https://www.bls.gov/cps/definitions.htm#unemployed"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Unemployed
                        </a>
                        : Those who have actively looked for work during the
                        past four weeks, and are available to start work
                        (includes new graduates and other recent entrants into
                        the labor force, those with informal jobs, those on
                        temporary layoff/furlough).
                    </span>
                    <br />
                    <span>
                        <a
                            href="https://www.bls.gov/cps/definitions.htm#laborforce"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Labor Force
                        </a>
                        : All people age 16 and older who are either employed or
                        unemployed (either working or actively looking for
                        work).
                    </span>
                    <br />
                    <span>
                        <a
                            href="https://www.bls.gov/cps/definitions.htm#lfpr"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Participation Rate
                        </a>
                        : The ratio of the Labor Force to the working-age
                        population (16+).
                    </span>
                </p>

                <p>
                    Unemployment descriptive ranges are sourced from the Bureau
                    of Labor and Statistics (less than 4% = economic boom; 4-6%
                    = healthy and unlikely to cause inflation; more than 6% =
                    recession-level unemployment likely to cause deflation).
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
            </AboutContent>
        </Modal>
    );
};

export default About;
