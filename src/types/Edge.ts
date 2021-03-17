import { Property } from "./Property";

export type Edge = {
    label: string;
    multiplicity: EdgeMultiplicity;
    properties: Property[];
};

export type EdgeMultiplicity =
    | "MULTI"
    | "SIMPLE"
    | "MANY2ONE"
    | "ONE2MANY"
    | "ONE2ONE";