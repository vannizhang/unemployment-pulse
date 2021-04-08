import React, { useRef, useState, useEffect } from 'react';

import {
    PathData,
    PathFrame,
    MonthlyUmempolymentDataPaths,
    FeatureWithPathData,
} from '../../../shared/types';

import { loadModules } from 'esri-loader';
import IMapView from 'esri/views/MapView';
import ICIMSymbol from 'esri/symbols/CIMSymbol';
import IGraphic from 'esri/Graphic';
import IPoint from 'esri/geometry/Point';
import IGraphicsLayer from 'esri/layers/GraphicsLayer';
import IwatchUtils from 'esri/core/watchUtils';
import { layer } from 'esri/views/3d/support/LayerPerformanceInfo';

type Props = {
    data: MonthlyUmempolymentDataPaths;
    // color?: string;
    visibleScale?: {
        min: number;
        max: number;
    };
    mapView?: IMapView;
};

const SparklineLayer: React.FC<Props> = ({
    data,
    // color,
    visibleScale,
    mapView,
}) => {
    const renderDealy = useRef<number>();

    const layerRef = useRef<IGraphicsLayer>();

    const [isLayerInVisibleScale, setIsLayerInVisibleScale] = useState<boolean>(
        false
    );

    const init = async () => {
        type Modules = [typeof IGraphicsLayer, typeof IwatchUtils];

        try {
            const [GraphicsLayer, watchUtils] = await (loadModules([
                'esri/layers/GraphicsLayer',
                'esri/core/watchUtils',
            ]) as Promise<Modules>);

            layerRef.current = new GraphicsLayer({
                minScale: visibleScale && visibleScale.min,
                maxScale: visibleScale && visibleScale.max,
                visible: false,
            });

            mapView.map.add(layerRef.current);

            watchUtils.whenTrue(mapView, 'stationary', () => {
                const isInVisibleScale =
                    mapView.scale < visibleScale.min &&
                    mapView.scale > visibleScale.max;
                setIsLayerInVisibleScale(isInVisibleScale);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const draw = async () => {
        const layer = layerRef.current;

        type Modules = [typeof ICIMSymbol, typeof IGraphic, typeof IPoint];

        try {
            const [CIMSymbol, Graphic, Point] = await (loadModules([
                'esri/symbols/CIMSymbol',
                'esri/Graphic',
                'esri/geometry/Point',
            ]) as Promise<Modules>);

            const { features, frames } = data;

            const frame = frames.PctUnemployed;

            const addGraphicsByChunk = (startIndex = 0) => {
                // console.log('doChunk', startIndex)
                const chunckNum = 800;
                const endIndex =
                    startIndex + chunckNum < features.length
                        ? startIndex + chunckNum
                        : features.length;

                const data: FeatureWithPathData[] = features.slice(
                    startIndex,
                    endIndex
                );

                const graphics = data.map((feature) => {
                    const { attributes, geometry, PctUnemployed } = feature;

                    const pathData = PctUnemployed;

                    const size = 30;

                    const { path } = pathData;

                    const color = [200, 200, 50, 255];

                    // Create the CIM symbol:
                    //  - set the size value
                    //  - assign the generated path to the marker's geometry
                    const symbol = new CIMSymbol({
                        data: {
                            type: 'CIMSymbolReference',
                            symbol: {
                                type: 'CIMPointSymbol',
                                symbolLayers: [
                                    {
                                        type: 'CIMVectorMarker',
                                        anchorPoint: {
                                            x: 0,
                                            y: -0.5,
                                        },
                                        anchorPointUnits: 'Relative',
                                        enable: true,
                                        scaleSymbolsProportionally: false,
                                        respectFrame: true,
                                        size,
                                        frame,
                                        markerGraphics: [
                                            {
                                                type: 'CIMMarkerGraphic',
                                                geometry: {
                                                    paths: [path],
                                                },
                                                symbol: {
                                                    type: 'CIMLineSymbol',
                                                    symbolLayers: [
                                                        {
                                                            type:
                                                                'CIMSolidStroke',
                                                            width: 1,
                                                            color,
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    });

                    const graphic = new Graphic({
                        geometry: new Point({
                            latitude: geometry.y,
                            longitude: geometry.x,
                        }),
                        symbol,
                    });

                    return graphic;
                });

                layer.addMany(graphics);

                if (startIndex + chunckNum < features.length) {
                    renderDealy.current = setTimeout(() => {
                        addGraphicsByChunk(startIndex + chunckNum);
                    }, 1);
                } else {
                    layer.visible = true;
                }
            };

            addGraphicsByChunk(0);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (layerRef.current && data) {
            layerRef.current.removeAll();
            clearTimeout(renderDealy.current);

            if (isLayerInVisibleScale) {
                draw();
            }
        }
    }, [layerRef, data]);

    useEffect(() => {
        if (
            data &&
            isLayerInVisibleScale &&
            !layerRef.current.graphics.length
        ) {
            clearTimeout(renderDealy.current);
            draw();
        }
    }, [isLayerInVisibleScale]);

    return null;
};

export default SparklineLayer;
