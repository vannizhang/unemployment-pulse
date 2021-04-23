import React, { useEffect, useRef } from 'react';

import { loadModules } from 'esri-loader';

import IMapView from 'esri/views/MapView';
import IFeatureLayer from 'esri/layers/FeatureLayer';
// import IPoint from 'esri/geometry/Point';
import IGraphic from 'esri/Graphic';
import IFeatureLayerView from 'esri/views/layers/FeatureLayerView';

type Props = {
    url: string;
    // itemId: string;
    outFields?: string[];
    mapView?: IMapView;
    visibleScale?: {
        min: number;
        max: number;
    };
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
    // onStart,
    onSelect,
    // pointerOnMove,
    // featureOnHover,
}) => {
    const layerRef = useRef<IFeatureLayer>();
    const layerViewRef = useRef<IFeatureLayerView>();
    // const mouseMoveDelay = useRef<number>();

    const isLayerInVisibleRange = () => {
        return (
            mapView.scale < layerRef.current.minScale &&
            mapView.scale > layerRef.current.maxScale
        );
    };

    const init = async () => {
        type Modules = [typeof IFeatureLayer];

        try {
            const [FeatureLayer] = await (loadModules([
                'esri/layers/FeatureLayer',
            ]) as Promise<Modules>);

            const layer = new FeatureLayer({
                url,
                // portalItem: {
                //     id: itemId
                // },
                minScale: visibleScale && visibleScale.min,
                maxScale: visibleScale && visibleScale.max,
                visible: true,
                popupEnabled: false,
                outFields,
                opacity: 0,
            });

            mapView.map.add(layer);

            mapView.whenLayerView(layer).then((layerView) => {
                // console.log(layerView)

                layerRef.current = layer;
                layerViewRef.current = layerView;

                initEventListeners();
            });
        } catch (err) {
            console.error(err);
        }
    };

    const queryFeatures = async ({
        event,
        where,
    }: {
        event?: __esri.MapViewClickEvent;
        where?: string;
    }) => {
        // console.log(mapView.scale)

        const isVisible = isLayerInVisibleRange();

        if (isVisible) {
            where = where || '1=1';

            const geometry = event ? mapView.toMap(event) : null;

            const results = await layerViewRef.current.queryFeatures({
                where,
                geometry,
                returnGeometry: true,
                outFields: outFields || ['*'],
            });

            onSelect(
                results.features && results.features.length
                    ? results.features[0]
                    : undefined
            );
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

    // useEffect(()=>{
    //     if(layerViewRef.current && defaultFIPS){

    //         const fieldName4FIPS = outFields[0]
    //         const where = `${fieldName4FIPS}='${defaultFIPS}'`
    //         queryFeatures({
    //             where
    //         })
    //     }
    // }, [layerViewRef.current])

    return null;
};

export default QueryTaskLayer;
