import { urlFns } from 'helper-toolkit-ts';
import { url } from 'node:inspector';

type UrlHashParamKey = '@' | 'fips';

type HashParams = {
    [key: string]: string;
};

export type MapLocation = {
    lon: number;
    lat: number;
    zoom: number;
};

const DefaultHashParams: HashParams = urlFns.parseHash();

export const getDefaultValueFromHashParams = (key: UrlHashParamKey) => {
    if (key === '@') {
        return getMapLocationFromUrlSearchParams(DefaultHashParams);
    }

    return DefaultHashParams[key] || null;
};

export const updateMapLocation = (mapLocation: MapLocation) => {
    const key: UrlHashParamKey = '@';

    if (!mapLocation) {
        return;
    }

    const { lon, lat, zoom } = mapLocation;

    urlFns.updateHashParam({
        key,
        value: `${lon},${lat},${zoom}`,
    });
};

const getMapLocationFromUrlSearchParams = (hashParams: HashParams) => {
    const key: UrlHashParamKey = '@';

    if (!hashParams[key]) {
        return null;
    }

    const values: number[] = hashParams[key].split(',').map((d: string) => +d);

    const [lon, lat, zoom] = values;

    return { lon, lat, zoom };
};

export const updateFIPSInURLHashParams = (FIPS?: string) => {
    const key: UrlHashParamKey = 'fips';

    urlFns.updateHashParam({
        key,
        value: FIPS || '',
    });
};

export const getFIPSFromURLHashParams = (FIPS?: string) => {
    const key: UrlHashParamKey = 'fips';

    const hashParams = urlFns.parseHash();

    return hashParams[key] || '';
};
