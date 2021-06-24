import { Property } from '../types/Property';
import { EdgeBuilder } from './EdgeBuilder';

describe('EdgeBuilder', () => {
    it('should be instantiated with a label', () => {
        const eb = new EdgeBuilder('test');
        const out = eb.build();
        // Conditional build
        expect(out).toContain(`if (!mgmt.containsEdgeLabel('test'))`);
        // Make label.
        expect(out).toContain(`mgmt.makeEdgeLabel('test')`);
        // Default multiplicity
        expect(out).toContain(`.multiplicity(MULTI).make();`);
        // Should not contain properties definitions by default
        expect(out).not.toContain('addProperties');
    });

    it('should set a property', () => {
        const eb = new EdgeBuilder('test');
        const prop: Property = {
            key: 'testprop',
            datatype: 'Byte',
            cardinality: 'SINGLE',
        };
        const out = eb.property(prop).build();
        expect(out).toContain(
            `mgmt.addProperties(mgmt.getEdgeLabel('test'), mgmt.getPropertyKey('testprop'))`
        );
    });

    it('should add multiple properties', () => {
        const eb = new EdgeBuilder('test');
        const [prop1, prop2] = [
            {
                key: 'testprop1',
                datatype: 'Byte',
                cardinality: 'SINGLE',
            },
            {
                key: 'testprop2',
                datatype: 'String',
                cardinality: 'SET',
            },
        ] as Property[];
        const out = eb.property(prop1).property(prop2).build();
        expect(out).toContain(
            `mgmt.addProperties(mgmt.getEdgeLabel('test'), mgmt.getPropertyKey('testprop1'), mgmt.getPropertyKey('testprop2'))`
        );
    });

    it('should ignore duplicates of the same property', () => {
        const eb = new EdgeBuilder('test');
        const prop: Property = {
            key: 'testprop',
            datatype: 'Byte',
            cardinality: 'SINGLE',
        };
        const out = eb
            .property(prop)
            .property({ ...prop })
            .build();
        expect(out).toContain(
            `mgmt.addProperties(mgmt.getEdgeLabel('test'), mgmt.getPropertyKey('testprop'))`
        );
    });
});
