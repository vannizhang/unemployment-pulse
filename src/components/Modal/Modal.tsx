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

export type Props = {
    isActive: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

const Modal: React.FC<Props> = ({ isActive, onClose, children }: Props) => {
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

                {children}
            </AboutContent>
        </AboutContainer>
    ) : null;
};

export default Modal;
