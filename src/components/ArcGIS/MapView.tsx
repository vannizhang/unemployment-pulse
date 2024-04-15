import React, { useContext } from 'react';

import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import { watch } from '@arcgis/core/core/reactiveUtils';

import {
    updateMapLocation,
    getDefaultValueFromHashParams,
    MapLocation,
} from '../../utils/URLHashParams';

import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';

interface Props {
    webmapId: string;
    children?: React.ReactNode;
}

const defaultMapLocation = getDefaultValueFromHashParams('@') as MapLocation;

const MapViewComponent: React.FC<Props> = ({ webmapId, children }: Props) => {
    const mapDivRef = React.useRef<HTMLDivElement>();

    const { isMobileDevice } = useContext<AppContextValue>(AppContext);

    const [mapView, setMapView] = React.useState<MapView>(null);

    const initMapView = () => {

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
            padding: {
                top: 60,
            },
        });

        if (isMobileDevice) {
            view.ui.remove('zoom');
        }

        view.when(() => {
            setMapView(view);
        });
    };

    const addWatchEvent = async () => {

        watch(
            () => mapView.stationary,
            (stationary) => {
                if(!stationary){
                    return
                }

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
            }
        );
    };

    React.useEffect(() => {
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

export default MapViewComponent;
