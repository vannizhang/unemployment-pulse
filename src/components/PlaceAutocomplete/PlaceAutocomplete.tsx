import React, { useContext, useEffect, useRef, useState } from 'react';
import { UnempolymentDataByFIPS } from '../../../shared/types';

import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';

import styled from 'styled-components';

import Trie, { PlaceData } from './Trie';

import {
    AUTOCOMPLETE_BACKGROUND,
    THEME_COLOR_ORANGE,
} from '../../constants/style';
import { ThemeText } from '../InfoPanel/InfoText';

type Props = {
    onSelect: (data: PlaceData) => void;
};

const AutocompleteItem = styled.div`
    color: ${THEME_COLOR_ORANGE};
    background-color: ${AUTOCOMPLETE_BACKGROUND};
    padding: 0.35rem 0.5rem;
    cursor: pointer;
`;

const trie = new Trie();

// max number of results that can be displayed in the autocomplete
const MAX_RESULTS = 10;

const populateTrie = (source: UnempolymentDataByFIPS) => {
    // populate the trie that will be used by the autocomplete
    if (!trie.hasPopulated) {
        for (const FIPS of Object.keys(source)) {
            const { attributes } = source[FIPS];

            const { name, fips, unemploymentRate } = attributes;

            const placeData = { name, fips, unemploymentRate };

            trie.insert(name, placeData);
        }
    }

    trie.hasPopulated = true;
};

const PlaceAutocomplete: React.FC<Props> = ({ onSelect }: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    const [searchTerm, setSearchTerm] = useState<string>();

    const [results, setResults] = useState<PlaceData[]>();

    const [selectedItem, setSelectedItem] = useState<PlaceData>();

    const { unemploymentDataByFIPS } = useContext<AppContextValue>(AppContext);

    const searchInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const inputVal = event.target.value;
        setSelectedItem(null);
        setSearchTerm(inputVal);
    };

    const searchInputOnKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        // if(event.key === 'ArrowDown'){
        // } else if (event.key === 'ArrowUp'){
        // } else if(event.key === 'Enter') {
        // } else {
        //     // do nothing
        // }
    };

    const getAutocompleteList = () => {
        if (!results || !results.length) {
            return null;
        }

        const list = results.map((placeData) => {
            const { name, fips, unemploymentRate } = placeData;

            return (
                <AutocompleteItem
                    key={fips}
                    onClick={setSelectedItem.bind(this, placeData)}
                >
                    <ThemeText color="orange">{name}</ThemeText>
                </AutocompleteItem>
            );
        });

        return <div>{list}</div>;
    };

    useEffect(() => {
        populateTrie(unemploymentDataByFIPS);
    }, []);

    useEffect(() => {
        if (!selectedItem) {
            return;
        }

        onSelect(selectedItem);
        setSearchTerm(selectedItem.name);
    }, [selectedItem]);

    useEffect(() => {
        if (!searchTerm || searchTerm.length < 2 || selectedItem) {
            setResults([]);
            return;
        }

        setResults(trie.findPlaces(searchTerm, MAX_RESULTS));
    }, [searchTerm]);

    return (
        <div ref={containerRef}>
            {getAutocompleteList()}
            <input
                type="text"
                autoComplete="off"
                placeholder=""
                value={searchTerm || ''}
                spellCheck={false}
                onChange={searchInputOnChange}
                onKeyDown={searchInputOnKeyDown}
            ></input>
        </div>
    );
};

export default PlaceAutocomplete;
