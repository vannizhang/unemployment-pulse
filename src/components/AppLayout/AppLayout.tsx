import React, { useContext, useState } from 'react';

import { MapView } from '../ArcGIS';

import { SparklineLayer, SparklineLayerSwitcher, QueryTaskLayer } from '../';

import {
    URL_US_COUNTIES_GENERALIZED,
    URL_US_STATES_GENERALIZED,
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

                <QueryTaskLayer
                    key="query-4-US-Counties"
                    url={URL_US_COUNTIES_GENERALIZED}
                    outFields={['FIPS']}
                    visibleScale={VISIBLE_SCALE_COUNTIES}
                    onSelect={(feature) => {
                        console.log(feature);
                        // const FIPS = feature
                        //     ? feature.attributes['FIPS']
                        //     : undefined;
                    }}
                />

                <QueryTaskLayer
                    key="query-4-US-States"
                    url={URL_US_STATES_GENERALIZED}
                    outFields={['STATE_FIPS']}
                    visibleScale={VISIBLE_SCALE_STATES}
                    onSelect={(feature) => {
                        console.log(feature);
                        // const FIPS = feature
                        //     ? feature.attributes['STATE_FIPS']
                        //     : undefined;
                    }}
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
