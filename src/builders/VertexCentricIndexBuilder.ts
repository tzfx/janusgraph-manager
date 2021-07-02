import { Builder } from './Builder.interface';
import { Direction, Order } from '../types/VertexCentricIndex';

/**
 * Index Builder for Vertex Centric indices.
 *
 * For Mixed/Composite, please use {@link IndexBuilder}
 */
export class VertexCentricIndexBuilder implements Builder<string> {
    private _keys: Set<string> = new Set();
    private _direction!: Direction;
    private _order: Order = 'asc';
    private _edgelabel!: string;

    constructor(private _name: string) {}

    edgelabel(edgelabel: string): this {
        this._edgelabel = edgelabel;
        return this;
    }

    direction(direction: Direction): this {
        this._direction = direction;
        return this;
    }

    order(order: Order): this {
        this._order = order;
        return this;
    }

    key(key: string): this {
        this._keys.add(key);
        return this;
    }

    build(): string {
        if (this._keys.size === 0) {
            throw Error(
                `Unable to generate vc index ${this._name} with no key definitions.`
            );
        }
        if (this._direction == null) {
            throw Error(
                `Unable to generate vc index ${this._name} with no directionality.`
            );
        }
        if (this._edgelabel == null || this._edgelabel === '') {
            throw Error(
                `Unable to generate vc index ${this._name} with no edge label.`
            );
        }
        let output = `if (!mgmt.containsRelationIndex(mgmt.getEdgeLabel('${this._edgelabel}'), '${this._name}')) `;
        output += `mgmt.buildEdgeIndex(`;
        output += `mgmt.getEdgeLabel('${this._edgelabel}'), `;
        output += `'${this._name}', `;
        output += `Direction.${this._direction}, `;
        output += `Order.${this._order}, `;
        output += [...this._keys]
            .map((key) => `mgmt.getPropertyKey('${key}')`)
            .join(', ');
        return output.concat(');0;');
    }
}
