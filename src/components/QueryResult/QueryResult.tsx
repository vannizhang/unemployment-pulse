import React, { useState, useEffect } from 'react';

// import { loadModules } from 'esri-loader';
import IMapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Polygon from '@arcgis/core/geometry/Polygon';
// import {
//     SPARKLINE_COLOR_ORANGE,
//     THEME_COLOR_ORANGE,
// } from '../../constants/style';
// import IPoint from 'esri/geometry/Point';
// import IGraphicsLayer from 'esri/layers/GraphicsLayer';
// import IwatchUtils from 'esri/core/watchUtils';

type Props = {
    queryResult: Graphic;
    mapView?: IMapView;
};

const QueryResult: React.FC<Props> = ({ queryResult, mapView }: Props) => {
    const [graphicLayer, setGraphicLayer] = useState<GraphicsLayer>();

    const init =  () => {
        const layer = new GraphicsLayer({
            // opacity: 0.3,
            blendMode: 'overlay',
            // effect: 'blur(3px)',
        });

        mapView.map.add(layer, 0);

        setGraphicLayer(layer);
    };

    const showQueryResult = () => {
        const graphic = new Graphic({
            geometry: new Polygon(queryResult.geometry),
        });

        graphic.symbol = new SimpleFillSymbol({
            color: [255, 255, 255, 0.5], //[33, 117, 160, 255],
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255, 255],
                width: 1,
            },
        });

        graphicLayer.add(graphic);
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (graphicLayer) {
            graphicLayer.removeAll();

            if (queryResult) {
                showQueryResult();
            }
        }
    }, [queryResult]);

    return null;
};

export default QueryResult;
