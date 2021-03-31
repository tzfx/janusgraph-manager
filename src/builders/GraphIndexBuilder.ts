import { Builder } from './Builder.interface';
import { CompositeOrMixedIndexType, IndexKey } from '../types/GraphIndex';

/**
 * Index Builder for Composite or Mixed indices.
 *
 * For VertexCentric indicies, please use {@link VertexCentricIndexBuilder}
 */
export class GraphIndexBuilder implements Builder<string> {
    private _type?: CompositeOrMixedIndexType;
    private _keys: IndexKey[] = [];
    private _unique?: boolean;
    private _label?: string;

    constructor(private _name: string) {}

    type(type: CompositeOrMixedIndexType): this {
        this._type = type;
        return this;
    }

    key(key: IndexKey): this {
        if (this._keys.some((k) => k.field === key.field)) return this;
        this._keys.push(key);
        return this;
    }

    unique(unique = false): this {
        this._unique = unique;
        return this;
    }

    label(label?: string): this {
        this._label = label;
        return this;
    }

    build(): string {
        if (this._keys.length === 0) {
            throw Error(
                `Unable to generate index ${this._name} with no key definitions.`
            );
        }
        let output = `if (!mgmt.containsGraphIndex('${this._name}')) `;
        output += `mgmt.buildIndex('${this._name}', Vertex.class)`;
        output += [...this._keys]
            .map(
                (key) =>
                    `.addKey(mgmt.getPropertyKey('${key.field}')${
                        this._type === 'Mixed'
                            ? `,Mapping.${key.mapping}.asParameter()`
                            : ''
                    })`
            )
            .join('');
        output += this._unique ? `.unique()` : '';
        output +=
            this._label != null
                ? `.indexOnly(mgmt.getVertexLabel('${this._label}'))`
                : '';
        return output.concat(
            this._type === 'Mixed'
                ? '.buildMixedIndex("search");'
                : '.buildCompositeIndex();'
        );
    }
}
