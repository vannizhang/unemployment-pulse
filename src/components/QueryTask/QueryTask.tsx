import React, { useEffect, useRef } from 'react';

// import { loadModules } from 'esri-loader';

import IMapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
// import IPoint from 'esri/geometry/Point';
import IGraphic from '@arcgis/core/Graphic';
// import IFeatureLayerView from 'esri/views/layers/FeatureLayerView';

type Props = {
    url: string;
    // itemId: string;
    outFields?: string[];
    mapView?: IMapView;
    visibleScale?: {
        min: number;
        max: number;
    };
    FIPS?: string;
    selectedFeature?: IGraphic;
    // onStart?: ()=>void;
    onSelect: (feature: IGraphic) => void;
    // pointerOnMove: (position: TooltipPosition) => void;
    // featureOnHover: (feature: IGraphic) => void;
};

const QueryTaskLayer: React.FC<Props> = ({
    url,
    // itemId,
    outFields,
    mapView,
    visibleScale,
    FIPS,
    selectedFeature,
    // onStart,
    onSelect,
    // pointerOnMove,
    // featureOnHover,
}) => {
    const layerRef = useRef<FeatureLayer>();
    // const layerViewRef = useRef<IFeatureLayerView>();
    // const mouseMoveDelay = useRef<number>();

    const isLayerInVisibleRange = () => {
        return (
            mapView.scale < layerRef.current.minScale &&
            mapView.scale > layerRef.current.maxScale
        );
    };

    const init = async () => {

        const layer = new FeatureLayer({
            url,
            // portalItem: {
            //     id: itemId
            // },
            minScale: visibleScale && visibleScale.min,
            maxScale: visibleScale && visibleScale.max,
            visible: false,
            popupEnabled: false,
            outFields,
            opacity: 0,
        });

        mapView.map.add(layer);

        layerRef.current = layer;
        // layerViewRef.current = layerView;

        if (FIPS) {
            queryFeatureByFIPS();
        }

        initEventListeners();
    };

    const queryFeatureByFIPS = () => {
        const fieldName4FIPS = outFields[0];
        const where = `${fieldName4FIPS}='${FIPS}'`;
        queryFeatures({
            where,
        });
    };

    const queryFeatures = async ({
        event,
        where,
    }: {
        event?: __esri.ViewClickEvent;
        where?: string;
    }) => {
        // console.log(mapView.scale)

        const isVisible = isLayerInVisibleRange();

        if (isVisible || where) {
            // where = where || '1=1';

            const geometry = event ? mapView.toMap(event) : null;

            const results = await layerRef.current.queryFeatures({
                where: where || '1=1',
                geometry,
                returnGeometry: true,
                outFields: outFields || ['*'],
            });

            // console.log(where, geometry)

            if (where && !geometry) {
                mapView.goTo(results.features[0].geometry);
            }

            if (results.features && results.features.length) {
                onSelect(results.features[0]);
            }
        }
    };

    const initEventListeners = () => {
        mapView.on('click', (event) => {
            queryFeatures({ event });
        });
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (layerRef.current && FIPS) {
            const fieldName4FIPS = outFields[0];

            // let's say user clicks on the map to query a county/starte,
            // this function will be called because the FIPS is also updated,
            // and we only want to call queryFeatureByFIPS if FIPS is not same to the FIPS of selected feature
            if (
                selectedFeature &&
                selectedFeature.attributes[fieldName4FIPS] === FIPS
            ) {
                return;
            }

            queryFeatureByFIPS();
        }
    }, [FIPS]);

    return null;
};

export default QueryTaskLayer;
