import { Builder } from "./Builder.interface";
import { Direction, Order } from "../types/VertexCentricIndex";

/**
 * Index Builder for Vertex Centric indices.
 * 
 * For Mixed/Composite, please use {@link IndexBuilder}
 */
export class VertexCentricIndexBuilder implements Builder<string> {
    private _keys: Set<string>;
    private _direction: Direction;
    private _order: Order;
    private _edgelabel: string;

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
        let output = `if (!mgmt.containsGraphIndex('${this._name}')) `;
        output += `mgmt.buildEdgeIndex(`;
        output += `mgmt.getEdgeLabel("${this._edgelabel}"),`;
        output += `'${this._name}',`;
        output += `Direction.${this._direction},`;
        output += `Order.${this._order},`;
        output += [...this._keys]
            .map((key) => `mgmt.getPropertyKey('${key}')`)
            .join(",");
        return output.concat(")");
    }
}
