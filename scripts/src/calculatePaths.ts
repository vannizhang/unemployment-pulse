import { MonthlyUmempolymentData } from "../../shared/types";

import {
    PathFrame,
    PathData,
    FeatureWithPathData,
    MonthlyUmempolymentDataPaths
} from '../../shared/types'

type ParamsCalculatePath = {
    values: number[];
    ymax: number;
    ymin?: number;
    xyRatio?: number;
}

const calculatePath = ({
    values,
    ymax,
    ymin = 0,
    xyRatio = 1
}:ParamsCalculatePath):PathData =>{

    const ymaxFromValues = values.reduce((prev, curr) => Math.max(prev, curr), Number.NEGATIVE_INFINITY);
    const yRatio = ymaxFromValues > ymax ? ymax / ymaxFromValues : 1;

    const xmax =  xyRatio === 1 
        ? ymax 
        : Math.ceil(ymax * xyRatio);

    const xRatio = xmax / values.length;

    const path = values.map((val, index)=>{

        // const x = +Math.round(xRatio * index).toFixed(0);

        const x = +(xRatio * index).toFixed(1);

        // const y = val <= ymax ? val : ymax;
        let y = yRatio === 1 
            ? val 
            : +Math.round(val * yRatio).toFixed(0);

        if( y > ymax ){
            y = ymax;
        }

        return [x, y];
    });

    return {
        path,
        frame: {
            xmin: 0,
            ymin,
            xmax,
            ymax
        }
    }
    
}

export const convertUnemploymentDataToPaths = (
    monthlyUmempolymentData: MonthlyUmempolymentData, 
    maxPctUnemployed?:number
):MonthlyUmempolymentDataPaths=>{

    const { 
        data, 
        maxPctUnemployedDeviation
    } = monthlyUmempolymentData;

    // for counties and states data, we can just use maxPctUnemployed from monthlyUmempolymentData
    // but need to use customized maxPctUnemployed for the national level data so it can be fit into the 
    // same frame of the counties and states sparklines
    maxPctUnemployed = maxPctUnemployed || monthlyUmempolymentData.maxPctUnemployed

    let framePctUnemployed:PathFrame;
    let framePctUnemployedDeviation:PathFrame;

    const features:FeatureWithPathData[] = data.map(d=>{

        const { 
            geometry,
            attributes,
            PctUnemployed,
            PctUnemployedDeviation
        } = d;

        const { fips } = attributes;

        const pathPctUnemployed = calculatePath({
            values: PctUnemployed,
            ymax: maxPctUnemployed
        });
        framePctUnemployed = framePctUnemployed || pathPctUnemployed.frame;

        let feature:FeatureWithPathData = {
            attributes:{
                fips
            },
            geometry,
            PctUnemployed: {
                path: pathPctUnemployed.path
            }
        }

        if(PctUnemployedDeviation && PctUnemployedDeviation.length){

            const pathPctUnemployedDeviation = calculatePath({
                values: PctUnemployedDeviation,
                ymax: maxPctUnemployedDeviation,
                ymin: -maxPctUnemployedDeviation
            });
            framePctUnemployedDeviation = framePctUnemployedDeviation || pathPctUnemployedDeviation.frame;

            feature = {
                ...feature,
                PctUnemployedDeviation: {
                    path: pathPctUnemployedDeviation.path
                }
            }
        }

        return feature;
    })

    return {
        features,
        frames: {
            PctUnemployed: framePctUnemployed,
            PctUnemployedDeviation: framePctUnemployedDeviation
        }
    }
}