export type GraphIndex = {
    name: string;
    keys: Set<IndexKey>;
    type: IndexType;
    unique?: boolean;
    label?: string;
};

export type IndexKey = {
    field: string;
    mapping: IndexKeyMapping;
};

export type IndexKeyMapping = "STRING" | "TEXT" | "TEXTSTRING" | "PREFIX_TREE";

export type IndexType = "Composite" | "Mixed" | "VertexCentric";
