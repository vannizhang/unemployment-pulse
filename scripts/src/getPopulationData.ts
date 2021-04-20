import * as counties from './data/US-Counties.json';
import * as states from './data/US-States.json';

type PopulationLookup = {
    [fips:string]: {
        name: string;
        population: number;
    }
}

export const getPopulationLookup = ()=>{

    const populationLookup:PopulationLookup = {};

    for(let county of counties.features){

        const { 
            NAME, STATE, POPULATION, FIPS
        } = county.attributes

        populationLookup[FIPS] = {
            name: `${NAME}, ${STATE}`,
            population: POPULATION
        }
    }

    for(let state of states.features){
        const {
            STATE_NAME, STATE_FIPS, POPULATION
        } = state.attributes;

        populationLookup[STATE_FIPS] = {
            name: STATE_NAME,
            population: POPULATION
        }
    }

    return populationLookup;
}