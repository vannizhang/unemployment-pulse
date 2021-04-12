import React, { useContext } from 'react';

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
    } = useContext<AppContextValue>(AppContext);

    return (
        <>
            <MapView webmapId={WEB_MAP_ID}>
                <SparklineLayer
                    data={unemploymentDataPathsStates}
                    visibleScale={VISIBLE_SCALE_STATES}
                />

                <SparklineLayer
                    data={unemploymentDataPathsCounties}
                    visibleScale={VISIBLE_SCALE_COUNTIES}
                />
            </MapView>
        </>
    );
};

export default AppLayout;