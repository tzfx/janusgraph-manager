import { Builder } from './Builder.interface';
import { Property } from '../types/Property';

export class VertexBuilder implements Builder<string> {
    private _properties: Property[] = [];

    constructor(private _label: string) {}

    property(property: Property): this {
        if (this._properties.some((p) => p.key === property.key)) return this;
        this._properties.push(property);
        return this;
    }

    build(): string {
        let output = `if (!mgmt.containsVertexLabel('${this._label}')) `;
        output += `mgmt.makeVertexLabel('${this._label}')`;
        output += '.make();';
        if (this._properties.length > 0) {
            output += 'mgmt.addProperties(';
            output += `mgmt.getVertexLabel('${this._label}'), `;
            output += [...this._properties]
                .map((prop) => `mgmt.getPropertyKey('${prop.key}')`)
                .join(', ');
            output += ')';
        }
        return output;
    }
}
