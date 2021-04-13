import React from 'react';
import classnames from 'classnames';

type Props = {
    showDeviation: boolean;
    onChange: () => void;
};

const SparklineLayerSwitcher: React.FC<Props> = ({
    showDeviation,
    onChange,
}: Props) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#fff',
                padding: '.5rem',
                cursor: 'pointer',
                zIndex: 1,
            }}
            onClick={onChange}
        >
            <nav className="breadcrumbs modifier-class">
                <span
                    className={classnames('crumb', {
                        'is-active': !showDeviation,
                    })}
                >
                    Pct Unemployment
                </span>
                <span
                    className={classnames('crumb', {
                        'is-active': showDeviation,
                    })}
                >
                    Deviation
                </span>
            </nav>
        </div>
    );
};

export default SparklineLayerSwitcher;
