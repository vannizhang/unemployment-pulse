import React from 'react';

import IMapView from '@arcgis/core/views/MapView';
import IExtent from '@arcgis/core/geometry/Extent';
import IGraphic from '@arcgis/core/Graphic';
import Search from '@arcgis/core/widgets/Search';

import { UIAddPosition } from './types';

type SearchResult = {
    extent: IExtent;
    feature: IGraphic;
    name: string;
    target: string;
};

type Props = {
    position?: UIAddPosition;
    containerId?: string;
    mapView?: IMapView;
    searchCompletedHandler?: (result: SearchResult) => void;
};

const SearchWidget: React.FC<Props> = ({
    position,
    containerId,
    mapView,
    searchCompletedHandler,
}: Props) => {
    const init = () => {
        const searchWidget = new Search({
            view: mapView,
            resultGraphicEnabled: false,
            popupEnabled: false,
            container: containerId,
        });

        if (position && !containerId) {
            mapView.ui.add(searchWidget, {
                position,
                index: 2,
            });
        }

        if (searchCompletedHandler) {
            searchWidget.on('search-complete', (evt:any) => {
                if (
                    searchWidget.results[0] &&
                    searchWidget?.results[0]?.results[0]
                ) {
                    const searchResult: SearchResult =
                        searchWidget.results[0].results[0];
                    // console.log(searchResultGeom);
                    searchCompletedHandler(searchResult);
                }
            });
        }
    };

    React.useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return null;
};

export default SearchWidget;
