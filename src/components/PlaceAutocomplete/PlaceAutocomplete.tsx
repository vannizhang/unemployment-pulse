import React, { useContext, useEffect, useRef, useState } from 'react';
import { UnempolymentDataByFIPS } from '../../../shared/types';

import { AppContext, AppContextValue } from '../../contexts/AppContextProvider';

import styled from 'styled-components';

import Trie, { PlaceData } from './Trie';

import {
    AUTOCOMPLETE_BACKGROUND,
    AUTOCOMPLETE_LIGHT_BACKGROUND,
    THEME_COLOR_ORANGE,
} from '../../constants/style';
import { ThemeText } from '../InfoPanel/InfoText';
import useOnClickOutside from '../../hooks/useOnClickOutside';

type Props = {
    bottomPosition?: number;
    onSelect: (data: PlaceData) => void;
};

type AutocompleteItemProps = {
    isCandidate?: boolean;
};

const BACKGROUND_COLOR = 'rgba(19, 106, 164, .5)';
const BACKGROUND_COLOR_HOVER = 'rgba(19, 106, 164, .55)';
const BORDER_COLOR = '#136AA4';

const AutocompleteWarp = styled.div`
    border-top: 1px solid ${BORDER_COLOR};
`;

const AutocompleteItem = styled.div<AutocompleteItemProps>`
    color: ${THEME_COLOR_ORANGE};
    background-color: ${(props) =>
        props.isCandidate ? BACKGROUND_COLOR_HOVER : BACKGROUND_COLOR};
    border-bottom: 1px solid ${BORDER_COLOR};
    padding: 0.35rem 0.5rem;
    cursor: pointer;
`;

const AutocompleteInput = styled.input`
    width: 270px;
    background-color: ${BACKGROUND_COLOR};
    border: 1px solid ${BORDER_COLOR};
    color: ${THEME_COLOR_ORANGE};

    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${THEME_COLOR_ORANGE};
        opacity: 0.75; /* Firefox */
    }
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

const PlaceAutocomplete: React.FC<Props> = ({
    bottomPosition,
    onSelect,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    const [searchTerm, setSearchTerm] = useState<string>();

    const [results, setResults] = useState<PlaceData[]>();

    const [selectedItem, setSelectedItem] = useState<PlaceData>();

    // the index that will be used to select auto complete item when hit enter
    const [candidateIdx, setCandidateIdx] = useState<number>(0);

    const { unemploymentDataByFIPS } = useContext<AppContextValue>(AppContext);

    const searchInputOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const inputVal = event.target.value;
        setSelectedItem(null);
        setCandidateIdx(0);
        setSearchTerm(inputVal);
    };

    const searchInputOnKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter') {
            if (results && results.length) {
                setSelectedItem(results[candidateIdx] || results[0]);
            }
        } else if (event.key === 'ArrowDown') {
            setCandidateIdx(
                candidateIdx + 1 < results.length ? candidateIdx + 1 : 0
            );
        } else if (event.key === 'ArrowUp') {
            setCandidateIdx(candidateIdx - 1 < 0 ? 0 : candidateIdx - 1);
        }
    };

    const getAutocompleteList = () => {
        if (!results || !results.length) {
            return null;
        }

        const list = results.map((placeData, index) => {
            const { name, fips, unemploymentRate } = placeData;

            return (
                <AutocompleteItem
                    key={fips}
                    onClick={setSelectedItem.bind(this, placeData)}
                    isCandidate={index === candidateIdx}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <ThemeText color="orange">{name}</ThemeText>
                        <ThemeText color="blue">{unemploymentRate}%</ThemeText>
                    </div>
                </AutocompleteItem>
            );
        });

        return <AutocompleteWarp>{list}</AutocompleteWarp>;
    };

    // close autocomplete list if clicks outside of the container
    useOnClickOutside(containerRef, () => {
        setResults([]);
    });

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
        <div
            style={{
                position: 'absolute',
                bottom: bottomPosition ? bottomPosition : '2rem',
                left: '1rem',
            }}
        >
            <div ref={containerRef}>
                {getAutocompleteList()}

                <AutocompleteInput
                    type="text"
                    autoComplete="off"
                    placeholder="Search State or County"
                    value={searchTerm || ''}
                    spellCheck={false}
                    onChange={searchInputOnChange}
                    onKeyDown={searchInputOnKeyDown}
                ></AutocompleteInput>
            </div>
        </div>
    );
};

export default PlaceAutocomplete;
