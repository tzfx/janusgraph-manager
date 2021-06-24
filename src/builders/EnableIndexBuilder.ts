import { IndexType } from '../types/GraphIndex';
import { Builder } from './Builder.interface';

export type SchemaAction = 'ENABLE_INDEX' | 'REINDEX';

/**
 * Builds a management string that attempts to enable a specific index.
 */
export class EnableIndexBuilder implements Builder<string> {
    private _type!: IndexType;
    private _label!: string;
    private _action: SchemaAction = 'ENABLE_INDEX';

    /**
     * Default constructor.
     * @param _name Index to attempt to enable.
     * @param _graph Graph name that the index resides on. Default `graph`.
     */
    constructor(private _name: string, private _graph: string = 'graph') {}

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
            console.warn(
                `Label ${label} set on EnableIndex builder. This only applies for VertexCentric indices.`
            );
        }
        this._label = label;
        return this;
    }

    action(action: SchemaAction): this {
        this._action = action;
        return this;
    }

    /**
     * Builds the output string.
     * @returns String that calls ENABLE_INDEX in JG.
     * @throws An Error if an attempt is made to enable a VertexCentric index without a label.
     */
    build(): string {
        let output = 'mgmt.updateIndex(';
        if (this._type === 'VertexCentric') {
            if (this._label == null || this._label === '')
                throw Error(
                    `Vertex Centric index '${this._name}' attempted to be enabled without a label definition.`
                );
            output += `mgmt.getRelationIndex(${this._graph}, '${this._name}', '${this._label}')`;
        } else {
            output += `mgmt.getGraphIndex('${this._name}')`;
        }
        output += `, SchemaAction.${this._action}).get();`;
        return output;
    }
}
