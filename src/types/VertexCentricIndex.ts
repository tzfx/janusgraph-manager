
export type VertexCentricIndex = {
    name: string;
    keys: Set<string>;
    direction: Direction;
    order: Order;
    edgelabel: string;
}

export type Direction = "IN" | "OUT";

export type Order = "desc" | "asc"