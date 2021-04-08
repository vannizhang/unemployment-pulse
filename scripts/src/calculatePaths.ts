import { MonthlyUmempolymentData, BasicFeature } from "./donwload-data";

type PathFrame = {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}

type PathData = {
    path: number[][];
    frame?: PathFrame;
}

type FeatureWithPathData = BasicFeature & {
    PctUnemployed: PathData;
    LaborForce: PathData;
}

export type MonthlyUmempolymentDataPaths = {
    features: FeatureWithPathData[];
    frames:{
        PctUnemployed: PathFrame;
        LaborForce: PathFrame;
    }
}

const calculatePath = (values: number[], ymax:number, xyRatio=1): PathData=>{

    const ymaxFromValues = values.reduce((prev, curr) => Math.max(prev, curr), Number.NEGATIVE_INFINITY);
    const yRatio = ymaxFromValues > ymax ? ymax / ymaxFromValues : 1;

    const xmax =  xyRatio === 1 
        ? ymax 
        : Math.ceil(ymax * xyRatio);

    const xRatio = xmax / values.length;

    const path = values.map((val, index)=>{

        const x = +Math.round(xRatio * index).toFixed(0);
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
            ymin: 0,
            xmax,
            ymax
        }
    }
    
}

export const convertUnemploymentDataToPaths = (monthlyUmempolymentData: MonthlyUmempolymentData):MonthlyUmempolymentDataPaths=>{

    const { 
        data, 
        maxLaborForce, 
        maxPctUnemployed 
    } = monthlyUmempolymentData;

    let framePctUnemployed:PathFrame;
    let frameLaborForce:PathFrame;

    const features:FeatureWithPathData[] = data.map(d=>{

        const { 
            geometry,
            attributes,
            LaborForce,
            PctUnemployed
        } = d;

        const pathPctUnemployed = calculatePath(PctUnemployed, maxPctUnemployed);
        const pathLaborForce = calculatePath(LaborForce, maxLaborForce);

        framePctUnemployed = framePctUnemployed || pathPctUnemployed.frame;
        frameLaborForce = frameLaborForce || pathLaborForce.frame;

        return {
            attributes,
            geometry,
            PctUnemployed: {
                path: pathPctUnemployed.path
            },
            LaborForce: {
                path: pathLaborForce.path
            }
        }
    })

    return {
        features,
        frames: {
            PctUnemployed: framePctUnemployed,
            LaborForce: frameLaborForce
        }
    }
}