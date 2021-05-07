import React, { useContext, useState, useEffect } from 'react';

import { MapView } from '../ArcGIS';

import {
    SparklineLayer,
    SparklineLayerSwitcher,
    QueryTaskLayer,
    QueryResultLayer,
    InfoPanel,
    Header,
    About,
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

import IGraphic from 'esri/Graphic';

import {
    updateFIPSInURLHashParams,
    getDefaultValueFromHashParams,
} from '../../utils/URLHashParams';

const defaultFIPS = getDefaultValueFromHashParams('fips') as string;
// console.log(defaultFIPS)

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
    ] = useState<UnempolymentData>(unemploymentDataByFIPS[defaultFIPS]);

    const [showDeviation, setShowDeviation] = useState<boolean>(false);

    const [selectedFeature, setSelectedFeature] = useState<IGraphic>();

    const [showAbout, setShowAbout] = useState<boolean>(false);

    useEffect(() => {
        if (selectedFeature) {
            const FIPS = selectedFeature
                ? selectedFeature.attributes['FIPS'] ||
                  selectedFeature.attributes['STATE_FIPS']
                : undefined;

            setUnemploymentData4SelectedFeature(unemploymentDataByFIPS[FIPS]);

            updateFIPSInURLHashParams(FIPS);
        }
    }, [selectedFeature]);

    return (
        <>
            <About
                isActive={showAbout}
                onClose={setShowAbout.bind(this, false)}
            />

            <Header infoBtnOnClick={setShowAbout.bind(this, true)}>
                <SparklineLayerSwitcher
                    showDeviation={showDeviation}
                    onChange={setShowDeviation.bind(this, !showDeviation)}
                />
            </Header>

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
                    defaultFIPS={
                        defaultFIPS && defaultFIPS.length === 5
                            ? defaultFIPS
                            : null
                    }
                    onSelect={setSelectedFeature}
                />

                <QueryTaskLayer
                    key="query-4-US-States"
                    url={URL_US_STATES_GENERALIZED}
                    outFields={['STATE_FIPS']}
                    visibleScale={VISIBLE_SCALE_STATES}
                    defaultFIPS={
                        defaultFIPS && defaultFIPS.length === 2
                            ? defaultFIPS
                            : null
                    }
                    onSelect={setSelectedFeature}
                />

                <QueryResultLayer queryResult={selectedFeature} />
            </MapView>

            <InfoPanel
                data={unemploymentData4SelectedFeature}
                close={() => {
                    setSelectedFeature(null);
                    setUnemploymentData4SelectedFeature(null);
                    updateFIPSInURLHashParams();
                }}
            />
        </>
    );
};

export default AppLayout;
