import React, { useContext } from 'react';
// import classnames from 'classnames';
import { THEME_COLOR_ORANGE } from '../../constants/style';
import { ThemeText } from '../InfoPanel/InfoText';

import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';

type Props = {
    showDeviation: boolean;
    onChange: () => void;
};

type SwitcherBtnProps = {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
};

const SwitcherBtn: React.FC<SwitcherBtnProps> = ({
    isActive,
    onClick,
    children,
}: SwitcherBtnProps) => {
    const borderColor = isActive ? THEME_COLOR_ORANGE : 'transparent';

    return (
        <div
            onClick={onClick}
            style={{
                borderBottom: `3px solid ${borderColor}`,
                margin: '0 .5rem',
                // lineHeight: '1.2',
                cursor: 'pointer',
            }}
        >
            {children}
        </div>
    );
};

const SparklineLayerSwitcher: React.FC<Props> = ({
    showDeviation,
    onChange,
}: Props) => {
    const { isMobileDevice } = useContext<AppContextValue>(AppContext);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <SwitcherBtn isActive={!showDeviation} onClick={onChange}>
                <ThemeText
                    color="orange"
                    // customLineHeight='1.1'
                >
                    {isMobileDevice ? 'Local' : 'Local Rate'}
                </ThemeText>{' '}
                <ThemeText
                    color="blue"
                    // customLineHeight='1'
                >
                    {'& '}{' '}
                    {isMobileDevice ? 'National Unemployment' : 'National Rate'}
                </ThemeText>
            </SwitcherBtn>

            <SwitcherBtn isActive={showDeviation} onClick={onChange}>
                <ThemeText
                    color="orange"
                    // customLineHeight='1'
                >
                    {isMobileDevice ? 'Difference' : 'Local Difference'}
                </ThemeText>{' '}
                <ThemeText
                    color="blue"
                    // customLineHeight='1'
                >
                    from National Rate
                </ThemeText>
            </SwitcherBtn>
        </div>
    );
};

export default SparklineLayerSwitcher;
