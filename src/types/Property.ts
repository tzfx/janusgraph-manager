/**
 * JanusGraph Property.
 * @property key - name of the property.
 * @property datatype - default: `Object.class`
 * @property cardinality - default: `SINGLE`
 */
export type Property = {
    key: string;
    datatype?: PropertyType;
    cardinality?: PropertyCardinality;
};

export type PropertyType =
    | 'String'
    | 'Character'
    | 'Boolean'
    | 'Byte'
    | 'Short'
    | 'Integer'
    | 'Long'
    | 'Float'
    | 'Double'
    | 'Date'
    | 'Geoshape'
    | 'UUID';

export type PropertyCardinality = 'SINGLE' | 'SET' | 'LIST';
