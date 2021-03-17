import { Builder } from "./Builder.interface";
import { IndexKey, IndexType } from "../types/GraphIndex";

/**
 * Index Builder for Composite or Mixed indices.
 * 
 * For VertexCentric indicies, please use {@link VertexCentricIndexBuilder}
 */
export class GraphIndexBuilder implements Builder<string> {
    private _type?: IndexType;
    private _keys: Set<IndexKey> = new Set();
    private _unique?: boolean;
    private _label?: string;

    constructor(private _name: string) {}

    type(type: IndexType): this {
        this._type = type;
        return this;
    }

    key(key: IndexKey): this {
        this._keys.add(key);
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
        let output = `if (!mgmt.containsGraphIndex('${this._name}')) `;
        output += `mgmt.buildIndex('${this._name}', Vertex.class)`;
        output += [...this._keys]
            .map(
                (key) =>
                    `.addKey(mgmt.getPropertyKey('${key.field}, Mapping.${key.mapping}.getParameter()'))`
            )
            .join("");
        output += this._unique ? `.unique()` : "";
        output += this._label != null ? `.indexOnly(mgmt.getVertexLabel('${this._label}))` : "";
        return output.concat(
            this._type === "Composite"
                ? ".buildCompositeIndex();"
                : '.buildMixedIndex("search");'
        );
    }
}
