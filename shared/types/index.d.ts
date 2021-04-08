export type BasicFeature = {
    attributes?: {
        fips: string;
        name: string;
        currentMonth: string;
    };
    geometry?: {
        x: number;
        y: number;
    };
}

export type PathFrame = {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}

export type PathData = {
    path: number[][];
    frame?: PathFrame;
}

export type FeatureWithPathData = BasicFeature & {
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