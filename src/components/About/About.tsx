import React from 'react';
import styled from 'styled-components';
import { THEME_COLOR_BLUE } from '../../constants/style';

const AboutContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(3, 26, 57, 0.8);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-sizing: border-box;
`;

const AboutContent = styled.div`
    max-width: 500px;

    svg {
        stroke: ${THEME_COLOR_BLUE};
        fill: ${THEME_COLOR_BLUE};
    }
`;

type Props = {
    isActive: boolean;
    onClose: () => void;
};

const About: React.FC<Props> = ({ isActive, onClose }: Props) => {
    return isActive ? (
        <AboutContainer className="animate-fade-in">
            <AboutContent className="text-theme-color-blue avenir-demi">
                <div className="text-right cursor-pointer" onClick={onClose}>
                    <svg
                        height="32"
                        width="32"
                        viewBox="0 0 32 32"
                        className=""
                    >
                        <path d="M23.985 8.722L16.707 16l7.278 7.278-.707.707L16 16.707l-7.278 7.278-.707-.707L15.293 16 8.015 8.722l.707-.707L16 15.293l7.278-7.278z" />
                    </svg>
                </div>

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
            </AboutContent>
        </AboutContainer>
    ) : null;
};

export default About;
