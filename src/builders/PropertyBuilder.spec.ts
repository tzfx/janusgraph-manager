import { PropertyBuilder } from './PropertyBuilder';

describe('PropertyBuilder', () => {
    it('should be instantiated with a key and default cardinality', () => {
        const pb = new PropertyBuilder('test');
        const out = pb.build();
        // Conditional build
        expect(out).toContain(`if (!mgmt.containsPropertyKey('test'))`);
        // Make property
        expect(out).toContain(`mgmt.makePropertyKey('test')`);
        // Use default dataType
        expect(out).not.toContain('dataType');
        // Make default cardinality
        expect(out).toContain(`.cardinality(Cardinality.SINGLE).make();`);
    });
    
    it('should set a datatype', () => {
        const pb = new PropertyBuilder('test');
        const out = pb.datatype("Short").build();
        expect(out).toContain(`.dataType(Short.class)`);
    });

    it('should set a cardinality', () => {
        const pb = new PropertyBuilder('test');
        const out = pb.cardinality("SET").build();
        expect(out).toContain(`.cardinality(Cardinality.SET)`);
    });

});
