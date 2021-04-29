import React from 'react';
// import classnames from 'classnames';
import { THEME_COLOR_ORANGE } from '../../constants/style';
import { ThemeText } from '../InfoPanel/InfoText';

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
                    Local Rate
                </ThemeText>{' '}
                <ThemeText
                    color="blue"
                    // customLineHeight='1'
                >
                    {'& '} National Rate
                </ThemeText>
            </SwitcherBtn>

            <SwitcherBtn isActive={showDeviation} onClick={onChange}>
                <ThemeText
                    color="orange"
                    // customLineHeight='1'
                >
                    Local Difference
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
