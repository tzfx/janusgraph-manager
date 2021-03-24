import { Builder } from "./Builder.interface";
import { PropertyCardinality, PropertyType } from "../types/Property";

export class PropertyBuilder implements Builder<string> {
    private _datatype!: PropertyType;
    private _cardinality: PropertyCardinality = "SINGLE";

    constructor(private _key: string) {}

    cardinality(cardinality: PropertyCardinality): this {
        this._cardinality = cardinality;
        return this;
    }

    datatype(datatype: PropertyType): this {
        this._datatype = datatype;
        return this;
    }

    build(): string {
        let output = "if (!mgmt.containsPropertyKey('${this._key}')) ";
        output += `mgmt.makePropertyKey('${this._key}')`;
        output +=
            this._datatype != null ? `.dataType(${this._datatype}.class)` : "";
        output +=
            this._cardinality != null
                ? `.cardinality(Cardinality.${this._cardinality})`
                : "";
        return output.concat(".make();");
    }
}
