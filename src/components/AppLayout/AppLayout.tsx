import React, { useContext, useState } from 'react';

import { MapView } from '../ArcGIS';

import { SparklineLayer } from '../';

import {
    VISIBLE_SCALE_COUNTIES,
    VISIBLE_SCALE_STATES,
    WEB_MAP_ID,
} from '../../constants/map';

import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';

const AppLayout = () => {
    const {
        unemploymentDataPathsStates,
        unemploymentDataPathsCounties,
        unemploymentDataPathsUS,
    } = useContext<AppContextValue>(AppContext);

    const [showDeviation, setShowDeviation] = useState<boolean>(true);

    return (
        <>
            <MapView webmapId={WEB_MAP_ID}>
                <SparklineLayer
                    showDeviation={showDeviation}
                    nationalLevelData={unemploymentDataPathsUS}
                    data={unemploymentDataPathsStates}
                    visibleScale={VISIBLE_SCALE_STATES}
                />

                <SparklineLayer
                    showDeviation={showDeviation}
                    nationalLevelData={unemploymentDataPathsUS}
                    data={unemploymentDataPathsCounties}
                    visibleScale={VISIBLE_SCALE_COUNTIES}
                />
            </MapView>
        </>
    );
};

export default AppLayout;
