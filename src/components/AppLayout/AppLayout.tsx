import React, { useContext, useState } from 'react';

import { MapView } from '../ArcGIS';

import { SparklineLayer, SparklineLayerSwitcher } from '../';

import {
    VISIBLE_SCALE_COUNTIES,
    VISIBLE_SCALE_STATES,
    WEB_MAP_ID,
} from '../../constants/map';

import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';
import {
    THEME_COLOR_BLUE_4_JSAPI,
    THEME_COLOR_ORANGE_4_JSAPI,
} from '../../constants/style';

const AppLayout = () => {
    const {
        unemploymentDataPathsStates,
        unemploymentDataPathsCounties,
        unemploymentDataPathsUS,
    } = useContext<AppContextValue>(AppContext);

    const [showDeviation, setShowDeviation] = useState<boolean>(false);

    return (
        <>
            <MapView webmapId={WEB_MAP_ID}>
                <SparklineLayer
                    showDeviation={showDeviation}
                    nationalLevelData={unemploymentDataPathsUS}
                    data={unemploymentDataPathsStates}
                    visibleScale={VISIBLE_SCALE_STATES}
                    color={THEME_COLOR_ORANGE_4_JSAPI}
                    referenceLineColor={THEME_COLOR_BLUE_4_JSAPI}
                />

                <SparklineLayer
                    showDeviation={showDeviation}
                    nationalLevelData={unemploymentDataPathsUS}
                    data={unemploymentDataPathsCounties}
                    visibleScale={VISIBLE_SCALE_COUNTIES}
                    color={THEME_COLOR_ORANGE_4_JSAPI}
                    referenceLineColor={THEME_COLOR_BLUE_4_JSAPI}
                />
            </MapView>

            <SparklineLayerSwitcher
                showDeviation={showDeviation}
                onChange={setShowDeviation.bind(this, !showDeviation)}
            />
        </>
    );
};

export default AppLayout;
