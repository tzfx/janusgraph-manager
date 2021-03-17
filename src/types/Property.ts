export type Property = {
    key: string;
    datatype: PropertyType;
    cardinality: PropertyCardinality;
};

export type PropertyType =
    | "String"
    | "Character"
    | "Boolean"
    | "Byte"
    | "Short"
    | "Integer"
    | "Long"
    | "Float"
    | "Double"
    | "Date"
    | "Geoshape"
    | "UUID";

export type PropertyCardinality = "SINGLE" | "SET" | "LIST";
