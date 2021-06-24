import { WaitForIndexBuilder } from './WaitForIndexBuilder';

describe('WaitForIndexBuilder', () => {
    it('should build a wait string based on name and default graph', () => {
        const wfib = new WaitForIndexBuilder('testindex');
        expect(wfib.build()).toEqual(
            `ManagementSystem.awaitGraphIndexStatus(graph, 'testindex').call()`
        );
    });

    it('should build a wait string based on name and custome graph', () => {
        const wfib = new WaitForIndexBuilder('testindex', 'testgraph');
        expect(wfib.build()).toEqual(
            `ManagementSystem.awaitGraphIndexStatus(testgraph, 'testindex').call()`
        );
    });
});
