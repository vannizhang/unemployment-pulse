import React, { useRef, useState, useEffect } from 'react';

import {
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

type Props = {
    data: MonthlyUmempolymentDataPaths;
    // will be used to render national trend
    nationalLevelData: MonthlyUmempolymentDataPaths;
    showDeviation?: boolean;
    color: number[];
    referenceLineColor: number[];
    visibleScale?: {
        min: number;
        max: number;
    };
    mapView?: IMapView;
};

const STROKE_WIDTH = 1.5;

const SparklineLayer: React.FC<Props> = ({
    data,
    nationalLevelData,
    showDeviation,
    color,
    referenceLineColor,
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

        const nationalLevelPathData =
            nationalLevelData.features[0].PctUnemployed.path;
        const nationalLevelFrame = nationalLevelData.frames.PctUnemployed;

        // console.log(nationalLevelData);

        try {
            const [CIMSymbol, Graphic, Point] = await (loadModules([
                'esri/symbols/CIMSymbol',
                'esri/Graphic',
                'esri/geometry/Point',
            ]) as Promise<Modules>);

            const { features, frames } = data;

            const frame = showDeviation
                ? frames.PctUnemployedDeviation
                : frames.PctUnemployed; // frames.PctUnemployed;

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
                    const {
                        geometry,
                        PctUnemployed,
                        PctUnemployedDeviation,
                    } = feature;

                    const pathData = showDeviation
                        ? PctUnemployedDeviation
                        : PctUnemployed;

                    const anchorPoint = {
                        x: 0,
                        y: showDeviation ? 0 : -0.5,
                    };

                    const size = showDeviation ? 60 : 30;

                    const { path } = pathData;

                    // const color = [50, 100, 255, 255];

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
                                        anchorPoint,
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
                                                            width: STROKE_WIDTH,
                                                            color,
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                    !showDeviation
                                        ? {
                                              type: 'CIMVectorMarker',
                                              anchorPoint,
                                              anchorPointUnits: 'Relative',
                                              enable: true,
                                              scaleSymbolsProportionally: false,
                                              respectFrame: true,
                                              size,
                                              frame: nationalLevelFrame,
                                              markerGraphics: [
                                                  {
                                                      type: 'CIMMarkerGraphic',
                                                      geometry: {
                                                          paths: [
                                                              nationalLevelPathData,
                                                          ],
                                                      },
                                                      symbol: {
                                                          type: 'CIMLineSymbol',
                                                          symbolLayers: [
                                                              {
                                                                  type:
                                                                      'CIMSolidStroke',
                                                                  width: STROKE_WIDTH,
                                                                  color: referenceLineColor,
                                                              },
                                                          ],
                                                      },
                                                  },
                                              ],
                                          }
                                        : null,
                                    showDeviation
                                        ? {
                                              type: 'CIMVectorMarker',
                                              anchorPoint,
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
                                                          paths: [
                                                              [
                                                                  [0, 0],
                                                                  [
                                                                      frame.xmax,
                                                                      0,
                                                                  ],
                                                              ],
                                                          ],
                                                      },
                                                      symbol: {
                                                          type: 'CIMLineSymbol',
                                                          symbolLayers: [
                                                              {
                                                                  type:
                                                                      'CIMSolidStroke',
                                                                  width: STROKE_WIDTH,
                                                                  color: referenceLineColor,
                                                              },
                                                          ],
                                                      },
                                                  },
                                              ],
                                          }
                                        : null,
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
    }, [layerRef, data, showDeviation]);

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
