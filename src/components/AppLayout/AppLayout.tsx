import React, { useContext, useState, useEffect } from 'react';

import { MapView } from '../ArcGIS';

import {
    SparklineLayer,
    SparklineLayerSwitcher,
    QueryTaskLayer,
    InfoPanel,
} from '../';

import {
    URL_US_COUNTIES_GENERALIZED,
    URL_US_STATES_GENERALIZED,
    VISIBLE_SCALE_COUNTIES,
    VISIBLE_SCALE_STATES,
    WEB_MAP_ID,
} from '../../constants/map';

import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';
import {
    SPARKLINE_COLOR_BLUE,
    SPARKLINE_COLOR_ORANGE,
} from '../../constants/style';
import { UnempolymentData } from '../../../shared/types';

const AppLayout = () => {
    const {
        unemploymentDataPathsStates,
        unemploymentDataPathsCounties,
        unemploymentDataPathsUS,
        unemploymentDataByFIPS,
    } = useContext<AppContextValue>(AppContext);

    // unemployment for selected county or state
    const [
        unemploymentData4SelectedFeature,
        setUnemploymentData4SelectedFeature,
    ] = useState<UnempolymentData>();

    const [showDeviation, setShowDeviation] = useState<boolean>(false);

    useEffect(() => {
        console.log(unemploymentData4SelectedFeature);
    }, [unemploymentData4SelectedFeature]);

    return (
        <>
            <MapView webmapId={WEB_MAP_ID}>
                <SparklineLayer
                    showDeviation={showDeviation}
                    nationalLevelData={unemploymentDataPathsUS}
                    data={unemploymentDataPathsStates}
                    visibleScale={VISIBLE_SCALE_STATES}
                    color={SPARKLINE_COLOR_ORANGE}
                    referenceLineColor={SPARKLINE_COLOR_BLUE}
                />

                <SparklineLayer
                    showDeviation={showDeviation}
                    nationalLevelData={unemploymentDataPathsUS}
                    data={unemploymentDataPathsCounties}
                    visibleScale={VISIBLE_SCALE_COUNTIES}
                    color={SPARKLINE_COLOR_ORANGE}
                    referenceLineColor={SPARKLINE_COLOR_BLUE}
                />

                <QueryTaskLayer
                    key="query-4-US-Counties"
                    url={URL_US_COUNTIES_GENERALIZED}
                    outFields={['FIPS']}
                    visibleScale={VISIBLE_SCALE_COUNTIES}
                    onSelect={(feature) => {
                        // console.log(feature);
                        const FIPS = feature
                            ? feature.attributes['FIPS']
                            : undefined;

                        setUnemploymentData4SelectedFeature(
                            unemploymentDataByFIPS[FIPS]
                        );
                    }}
                />

                <QueryTaskLayer
                    key="query-4-US-States"
                    url={URL_US_STATES_GENERALIZED}
                    outFields={['STATE_FIPS']}
                    visibleScale={VISIBLE_SCALE_STATES}
                    onSelect={(feature) => {
                        // console.log(feature);
                        const FIPS = feature
                            ? feature.attributes['STATE_FIPS']
                            : undefined;

                        setUnemploymentData4SelectedFeature(
                            unemploymentDataByFIPS[FIPS]
                        );
                    }}
                />
            </MapView>

            <SparklineLayerSwitcher
                showDeviation={showDeviation}
                onChange={setShowDeviation.bind(this, !showDeviation)}
            />

            <InfoPanel data={unemploymentData4SelectedFeature} />
        </>
    );
};

export default AppLayout;
