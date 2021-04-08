import React from 'react';

import { MapView } from '../ArcGIS';

import { SparklineLayer } from '../';

import { WEB_MAP_ID } from '../../constants/map';

const AppLayout = () => {
    return (
        <>
            <MapView webmapId={WEB_MAP_ID}>
                <SparklineLayer />
            </MapView>
        </>
    );
};

export default AppLayout;
