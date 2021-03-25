import { VertexCentricIndexBuilder } from './VertexCentricIndexBuilder';

describe('VertexCentricIndexBuilder', () => {
    it('should be instantiated with a name, label, key, and direction', () => {
        const vcib = new VertexCentricIndexBuilder('test');
        const out = vcib.key('testkey').edgelabel('testlabel').direction('BOTH').build();
        // Conditional build
        expect(out).toContain(`if (!mgmt.containsGraphIndex('test'))`);
        expect(out).toContain(
            `mgmt.buildEdgeIndex(mgmt.getEdgeLabel('testlabel'), 'test', Direction.BOTH, Order.asc, mgmt.getPropertyKey('testkey'));`);
    });
    
    it('should handle multiple keys', () => {
        const vcib = new VertexCentricIndexBuilder('test');
        const [key1, key2] = ['testkey1', 'testkey2'];
        const out = vcib.key(key1).key(key2).edgelabel('testlabel').direction('BOTH').build();
        expect(out).toContain(`mgmt.getPropertyKey('testkey1')`);
        expect(out).toContain(`mgmt.getPropertyKey('testkey2')`);
    });

    it('should set order', () => {
        const vcib = new VertexCentricIndexBuilder('test');
        const out = vcib.key('testkey').edgelabel('testlabel').direction('BOTH').order('desc').build();
        expect(out).toContain(`Order.desc`);
    });

    it('should ignore duplicate keys', () => {
        const vcib = new VertexCentricIndexBuilder('test');
        const key = 'testkey';
        const out = vcib.key(key).key(key).edgelabel('testlabel').direction('BOTH').build();
        expect(out).toContain(
            `mgmt.buildEdgeIndex(mgmt.getEdgeLabel('testlabel'), 'test', Direction.BOTH, Order.asc, mgmt.getPropertyKey('testkey'));`
        );
    });

    it('should throw if no keys defined', () => {
        const vcib = new VertexCentricIndexBuilder('test');
        const out = vcib.edgelabel('testlabel').direction('BOTH');
        expect(() => out.build()).toThrowError();
    });

    it('should throw if no label defined', () => {
        const vcib = new VertexCentricIndexBuilder('test');
        const out = vcib.key('testkey').direction('BOTH');
        expect(() => out.build()).toThrowError();
    });

    it('should throw if no direction defined', () => {
        const vcib = new VertexCentricIndexBuilder('test');
        const out = vcib.key('testkey').edgelabel('testlabel');
        expect(() => out.build()).toThrowError();
    });

});
