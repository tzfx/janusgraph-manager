import { EnableIndexBuilder } from './EnableIndexBuilder';

describe('EnableIndexBuilder', () => {
    it('should be instantiated with a name and default graph', () => {
        const eib = new EnableIndexBuilder('test');
        const out = eib.build();
        expect(out).toEqual(`mgmt.updateIndex(mgmt.getGraphIndex(graph, 'test'), SchemaAction.ENABLE_INDEX);`);
    });
    
    it('should be instantiated with a name and custom graph', () => {
        const eib = new EnableIndexBuilder('test', 'testgraph');
        const out = eib.build();
        expect(out).toEqual(`mgmt.updateIndex(mgmt.getGraphIndex(testgraph, 'test'), SchemaAction.ENABLE_INDEX);`);
    });

    it('should set a vertex label for a VC index', () => {
        const eib = new EnableIndexBuilder('test');
        const out = eib.type('VertexCentric').label('testlabel').build();
        expect(out).toEqual(`mgmt.updateIndex(mgmt.getRelationIndex(graph, 'test', 'testlabel'), SchemaAction.ENABLE_INDEX);`);
    });

    it('should throw if a vertex index is enabled without a label', () => {
        const eib = new EnableIndexBuilder('test');
        expect(() => eib.type('VertexCentric').build()).toThrowError();
    });
});
