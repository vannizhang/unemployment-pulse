import React from 'react';

import { loadModules, loadCss } from 'esri-loader';
import IMapView from 'esri/views/MapView';
import IWebMap from 'esri/WebMap';
import IwatchUtils from 'esri/core/watchUtils';

import {
    updateMapLocation,
    getDefaultValueFromHashParams,
    MapLocation,
} from '../../utils/URLHashParams';

interface Props {
    webmapId: string;
    children?: React.ReactNode;
}

const defaultMapLocation = getDefaultValueFromHashParams('@') as MapLocation;

const MapView: React.FC<Props> = ({ webmapId, children }: Props) => {
    const mapDivRef = React.useRef<HTMLDivElement>();

    const [mapView, setMapView] = React.useState<IMapView>(null);

    const initMapView = async () => {
        type Modules = [typeof IMapView, typeof IWebMap];

        try {
            const [MapView, WebMap] = await (loadModules([
                'esri/views/MapView',
                'esri/WebMap',
            ]) as Promise<Modules>);

            const { lat, lon, zoom } = defaultMapLocation || {};

            const center = lon && lat ? [lon, lat] : undefined;

            const view = new MapView({
                container: mapDivRef.current,
                map: new WebMap({
                    portalItem: {
                        id: webmapId,
                    },
                }),
                center,
                zoom,
            });

            view.when(() => {
                setMapView(view);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const addWatchEvent = async () => {
        type Modules = [typeof IwatchUtils];

        try {
            const [watchUtils] = await (loadModules([
                'esri/core/watchUtils',
            ]) as Promise<Modules>);

            watchUtils.whenTrue(mapView, 'stationary', () => {
                // console.log('mapview is stationary', mapView.center, mapView.zoom);

                if (mapView.zoom === -1) {
                    return;
                }

                // console.log(mapView.scale)

                const centerLocation = {
                    lat:
                        mapView.center && mapView.center.latitude
                            ? +mapView.center.latitude.toFixed(3)
                            : 0,
                    lon:
                        mapView.center && mapView.center.longitude
                            ? +mapView.center.longitude.toFixed(3)
                            : 0,
                    zoom: mapView.zoom,
                };

                updateMapLocation(centerLocation);
            });
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        loadCss();
        initMapView();
    }, []);

    React.useEffect(() => {
        if (mapView) {
            addWatchEvent();
        }
    }, [mapView]);

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
                ref={mapDivRef}
            ></div>
            {mapView
                ? React.Children.map(children, (child) => {
                      return React.cloneElement(
                          child as React.ReactElement<any>,
                          {
                              mapView,
                          }
                      );
                  })
                : null}
        </>
    );
};

export default MapView;
