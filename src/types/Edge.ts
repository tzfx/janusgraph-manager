import { Property } from './Property';

/**
 * JanusGraph Edge.
 * @property label - Edge label
 * @property multiplicity - default: `MULTI`
 * @property properties
 */
export type Edge = {
    label: string;
    multiplicity?: EdgeMultiplicity;
    properties: Property[];
};

export type EdgeMultiplicity =
    | 'MULTI'
    | 'SIMPLE'
    | 'MANY2ONE'
    | 'ONE2MANY'
    | 'ONE2ONE';
