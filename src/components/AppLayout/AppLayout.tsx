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
    PlaceAutoComplete,
} from '../';

import { INFO_PANEL_HEIGHT } from '../InfoPanel/InfoPanel';

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

    const [FIPS4SelectedFeature, setFIPS4SelectedFeature] = useState<string>(
        defaultFIPS
    );

    useEffect(() => {
        if (selectedFeature) {
            const FIPS = selectedFeature
                ? selectedFeature.attributes['FIPS'] ||
                  selectedFeature.attributes['STATE_FIPS']
                : undefined;

            setFIPS4SelectedFeature(FIPS);
        }
    }, [selectedFeature]);

    useEffect(() => {
        setUnemploymentData4SelectedFeature(
            unemploymentDataByFIPS[FIPS4SelectedFeature]
        );
        updateFIPSInURLHashParams(FIPS4SelectedFeature);
    }, [FIPS4SelectedFeature]);

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
                    FIPS={
                        FIPS4SelectedFeature &&
                        FIPS4SelectedFeature.length === 5
                            ? FIPS4SelectedFeature
                            : null
                    }
                    selectedFeature={selectedFeature}
                    onSelect={setSelectedFeature}
                />

                <QueryTaskLayer
                    key="query-4-US-States"
                    url={URL_US_STATES_GENERALIZED}
                    outFields={['STATE_FIPS']}
                    visibleScale={VISIBLE_SCALE_STATES}
                    FIPS={
                        FIPS4SelectedFeature &&
                        FIPS4SelectedFeature.length === 2
                            ? FIPS4SelectedFeature
                            : null
                    }
                    selectedFeature={selectedFeature}
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

            <PlaceAutoComplete
                bottomPosition={
                    unemploymentData4SelectedFeature ? INFO_PANEL_HEIGHT : 0
                }
                onSelect={(placeData) => {
                    // console.log(placeData);
                    setFIPS4SelectedFeature(placeData.fips);
                }}
            />
        </>
    );
};

export default AppLayout;
