export type PlaceData = {
    name: string;
    fips: string;
    unemploymentRate: number;
};

class TrieNode {
    value: string;
    data: PlaceData;
    children: {
        [char: string]: TrieNode;
    };
    isEndOfWord: boolean;

    constructor(char: string) {
        this.value = char;
        this.children = {};
        this.isEndOfWord = false;
    }

    hasChild(char: string) {
        return this.children[char] !== undefined;
    }

    addChild(char: string) {
        this.children[char] = new TrieNode(char);
    }

    getChild(char: string) {
        return this.children[char];
    }

    removeChild(char: string) {
        delete this.children[char];
    }

    getChildren() {
        return Object.values(this.children);
    }

    hasChildren() {
        return Object.keys(this.children).length > 0;
    }
}

class Trie {
    root: TrieNode;
    hasPopulated: boolean;

    constructor() {
        this.root = new TrieNode('');
    }

    insert(word: string, data: PlaceData) {
        let currNode = this.root;

        if (!word || !word.length) {
            return;
        }

        word = word.toLowerCase();

        for (let i = 0; i < word.length; i++) {
            const char = word[i];

            if (!currNode.hasChild(char)) {
                currNode.addChild(char);
            }

            currNode = currNode.getChild(char);
        }

        currNode.isEndOfWord = true;
        currNode.data = data;
    }

    contains(word: string) {
        let currNode = this.root;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];

            if (!currNode.hasChild(char)) {
                return false;
            }

            currNode = currNode.getChild(char);
        }

        return currNode.isEndOfWord;
    }

    findPlaces(prefix: string, maxResults: number): PlaceData[] {
        prefix = prefix.toLowerCase();

        const results: PlaceData[] = [];

        const lastNode = this.findLastNodeOf(prefix);

        if (!lastNode) {
            return [];
        }

        this.findPlacesHelper(lastNode, prefix, results);

        results.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

        return results.length > maxResults
            ? results.slice(0, maxResults)
            : results;
    }

    private findPlacesHelper(
        node: TrieNode,
        prefix: string,
        places: PlaceData[]
    ) {
        if (!node) {
            return;
        }

        if (node.isEndOfWord) {
            places.push(node.data);
        }

        for (const child of node.getChildren()) {
            this.findPlacesHelper(child, prefix + child.value, places);
        }
    }

    private findLastNodeOf(prefix: string): TrieNode | null {
        if (!prefix) {
            return null;
        }

        let currNode = this.root;

        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];

            if (!currNode.hasChild(char)) {
                return null;
            }

            currNode = currNode.getChild(char);
        }

        return currNode;
    }
}

export default Trie;
