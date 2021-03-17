import { Builder } from "./Builder.interface";
import { Property } from "../types/Property";

export class VertexBuilder implements Builder<string> {
    private _properties: Set<Property> = new Set();

    constructor(private _label: string) {}

    property(property: Property): this {
        this._properties.add(property);
        return this;
    }

    build(): string {
        let output = `if (!mgmt.containsVertexLabel('${this._label}')) `;
        output += `mgmt.makeVertexLabel('${this._label}')`;
        output += ".make();";
        if (this._properties.size > 0) {
            output += "mgmt.addProperties(";
            output += `mgmt.getVertexLabel(${this._label}),`;
            output += [...this._properties]
                .map((prop) => `mgmt.getPropertyKey('${prop.key})`)
                .join(",");
            output += ")";
        }
        return output;
    }
}
