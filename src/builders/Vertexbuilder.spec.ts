import { Property } from '../types/Property';
import { VertexBuilder } from './VertexBuilder';

describe('VertexBuilder', () => {
    it('should be instantiated with a label', () => {
        const vb = new VertexBuilder('test');
        const out = vb.build();
        // Conditional build
        expect(out).toContain(`if (!mgmt.containsVertexLabel('test'))`);
        // Make label.
        expect(out).toContain(`mgmt.makeVertexLabel('test').make();`);
        // Should not contain properties definitions by default
        expect(out).not.toContain('addProperties');
    });

    it('should set a property', () => {
        const vb = new VertexBuilder('test');
        const prop: Property = {
            key: 'testprop',
            datatype: 'Byte',
            cardinality: 'SINGLE',
        };
        const out = vb.property(prop).build();
        expect(out).toContain(
            `mgmt.addProperties(mgmt.getVertexLabel('test'), mgmt.getPropertyKey('testprop'))`
        );
    });

    it('should add multiple properties', () => {
        const vb = new VertexBuilder('test');
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
        const out = vb.property(prop1).property(prop2).build();
        expect(out).toContain(
            `mgmt.addProperties(mgmt.getVertexLabel('test'), mgmt.getPropertyKey('testprop1'), mgmt.getPropertyKey('testprop2'))`
        );
    });

    it('should ignore duplicates of the same property', () => {
        const vb = new VertexBuilder('test');
        const prop: Property = {
            key: 'testprop',
            datatype: 'Byte',
            cardinality: 'SINGLE',
        };
        const out = vb
            .property(prop)
            .property({ ...prop })
            .build();
        expect(out).toContain(
            `mgmt.addProperties(mgmt.getVertexLabel('test'), mgmt.getPropertyKey('testprop'))`
        );
    });
});
