import { IndexType } from '../types/GraphIndex';
import { Builder } from './Builder.interface';

/**
 * Builds a management string that attempts to enable a specific index.
 */
export class EnableIndexBuilder implements Builder<string> {

    private _type!: IndexType;
    private _label!: string;

    /**
     * Default constructor.
     * @param _name Index to attempt to enable.
     * @param _graph Graph name that the index resides on. Default `graph`.
     */
    constructor(private _name: string, private _graph: string = 'graph') {
    }

    type(type: IndexType): this {
        this._type = type;
        return this;
    }

    /**
     * Sets the vertex label for VertexCentric indicies.
     * @param label Label
     * @returns The builder.
     */
    label(label: string): this {
        if (this._type !== 'VertexCentric') {
            console.warn(`Label ${label} set on EnableIndex builder. This only applies for VertexCentric indices.`);
        }
        this._label = label;
        return this;
    }

    build(): string {
        let output = 'mgmt.updateIndex(';
        if (this._type === "VertexCentric") {
            output += `mgmt.getRelationIndex(${this._graph}, '${this._name}', '${this._label}')`;
        } else {
            output += `mgmt.getGraphIndex(${this._graph}, '${this._name}')`;
        }
        output += `, SchemaAction.ENABLE_INDEX);`;
        return output;
    }

}