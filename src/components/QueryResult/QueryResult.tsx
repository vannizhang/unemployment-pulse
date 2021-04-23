import React, { useState, useEffect } from 'react';

import { loadModules } from 'esri-loader';
import IMapView from 'esri/views/MapView';
import IGraphic from 'esri/Graphic';
import IGraphicsLayer from 'esri/layers/GraphicsLayer';
import ISimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';
import IPolygon from 'esri/geometry/Polygon';
import {
    SPARKLINE_COLOR_ORANGE,
    THEME_COLOR_ORANGE,
} from '../../constants/style';
// import IPoint from 'esri/geometry/Point';
// import IGraphicsLayer from 'esri/layers/GraphicsLayer';
// import IwatchUtils from 'esri/core/watchUtils';

type Props = {
    queryResult: IGraphic;
    mapView?: IMapView;
};

const QueryResult: React.FC<Props> = ({ queryResult, mapView }: Props) => {
    const [graphicLayer, setGraphicLayer] = useState<IGraphicsLayer>();

    const init = async () => {
        type Modules = [typeof IGraphicsLayer];

        try {
            const [GraphicsLayer] = await (loadModules([
                'esri/layers/GraphicsLayer',
            ]) as Promise<Modules>);

            const layer = new GraphicsLayer({});

            mapView.map.add(layer);

            setGraphicLayer(layer);
        } catch (err) {
            console.error(err);
        }
    };

    const showQueryResult = async () => {
        type Modules = [
            typeof IGraphic,
            typeof IPolygon,
            typeof ISimpleFillSymbol
        ];

        const [Graphic, Polygon, SimpleFillSymbol] = await (loadModules([
            'esri/Graphic',
            'esri/geometry/Polygon',
            'esri/symbols/SimpleFillSymbol',
        ]) as Promise<Modules>);

        const graphic = new Graphic({
            geometry: new Polygon(queryResult.geometry),
        });

        graphic.symbol = new SimpleFillSymbol({
            color: [0, 0, 0, 0],
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: SPARKLINE_COLOR_ORANGE,
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
