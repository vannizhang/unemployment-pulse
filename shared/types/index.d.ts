export type BasicFeature = {
    attributes?: {
        fips: string;
        name?: string;
        population?: number;
        workforce?: number;
        unemployed?: number;
        unemploymentRate?: number;
        rank?: number;
        // currentMonth: string;
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
    PctUnemployedDeviation?: PathData;
}

export type MonthlyUmempolymentDataPaths = {
    features: FeatureWithPathData[];
    frames:{
        PctUnemployed: PathFrame;
        PctUnemployedDeviation?: PathFrame;
    }
}

export type UnempolymentData = BasicFeature & {
    PctUnemployed: number[];
    PctUnemployedDeviation?: number[];
}

export type MonthlyUmempolymentData = {
    data: UnempolymentData[];
    maxPctUnemployed: number;
    maxPctUnemployedDeviation?: number;
}

export type UnempolymentDataByFIPS = {
    [fips:string]: UnempolymentData
}