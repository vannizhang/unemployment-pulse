import axios from 'axios';
import { UNEMPLOYMENT_SERVICE_URL } from '../../shared/constants';

export const queryMonths = async () => {
    let result: string[] = [];

    const { data } = await axios.get(`${UNEMPLOYMENT_SERVICE_URL}/0/query`, {
        params: {
            where: '1=1',
            outFields: [
                'CurrentMonth',
                'P01Month',
                'P02Month',
                'P03Month',
                'P04Month',
                'P05Month',
                'P06Month',
                'P07Month',
                'P08Month',
                'P09Month',
                'P10Month',
                'P11Month',
                'P12Month',
                'P13Month',
            ].join(','),
            returnGeometry: false,
            f: 'json',
        },
    });

    if (data.features) {
        const feature = data.features[0];

        const {
            CurrentMonth,
            P01Month,
            P02Month,
            P03Month,
            P04Month,
            P05Month,
            P06Month,
            P07Month,
            P08Month,
            P09Month,
            P10Month,
            P11Month,
            P12Month,
            P13Month,
        } = feature.attributes;

        result = [
            CurrentMonth,
            P01Month,
            P02Month,
            P03Month,
            P04Month,
            P05Month,
            P06Month,
            P07Month,
            P08Month,
            P09Month,
            P10Month,
            P11Month,
            P12Month,
            P13Month,
        ].reverse();
    }

    return result;
};
