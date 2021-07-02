import { EnableIndexBuilder } from './EnableIndexBuilder';

describe('EnableIndexBuilder', () => {
    it('should be instantiated with a name', () => {
        const eib = new EnableIndexBuilder('test');
        const out = eib.build();
        expect(out).toEqual(
            `mgmt.updateIndex(mgmt.getGraphIndex('test'), SchemaAction.ENABLE_INDEX).get();`
        );
    });

    it('should set a new action', () => {
        const eib = new EnableIndexBuilder('test');
        const out = eib.action('REINDEX').build();
        expect(out).toEqual(
            `mgmt.updateIndex(mgmt.getGraphIndex('test'), SchemaAction.REINDEX).get();`
        );
    });

    it('should set a vertex label for a VC index with default graph name', () => {
        const eib = new EnableIndexBuilder('test');
        const out = eib.type('VertexCentric').label('testlabel').build();
        expect(out).toEqual(
            `mgmt.updateIndex(mgmt.getRelationIndex(mgmt.getEdgeLabel('testlabel'), 'test'), SchemaAction.ENABLE_INDEX).get();`
        );
    });

    it('should set a vertex label and graph for a VC index', () => {
        const eib = new EnableIndexBuilder('test', 'testgraph');
        const out = eib.type('VertexCentric').label('testlabel').build();
        expect(out).toEqual(
            `mgmt.updateIndex(mgmt.getRelationIndex(mgmt.getEdgeLabel('testlabel'), 'test'), SchemaAction.ENABLE_INDEX).get();`
        );
    });

    it('should throw if a vertex index is enabled without a label', () => {
        const eib = new EnableIndexBuilder('test');
        expect(() => eib.type('VertexCentric').build()).toThrowError();
    });
});
