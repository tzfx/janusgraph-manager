import { driver } from "gremlin";
import { GraphSchema } from "./types/GraphSchema";
import {
    EdgeBuilder,
    GraphIndexBuilder,
    PropertyBuilder,
    VertexBuilder,
    VertexCentricIndexBuilder,
} from "./builders";

type ManagerState = "NEW" | "INITIALIZED" | "ERROR" | "CLOSED";

export class JanusGraphManager {

    private state: ManagerState = "NEW";

    private OPEN_MGMT = `mgmt = ${this.graphName}.openManagement();0;`;

    /**
     * 
     * @param client Preconfigured gremlin client to use.
     * @param graphName Name of the graph to traverse. Default `graph`.
     * @param useConfiguredGraphFactory Whether or not to use the ConfiguredGraphFactory for dynamic graphs. Default `false`.
     */
    constructor(private client: driver.Client, private graphName: string = 'graph', private useConfiguredGraphFactory: boolean = false) {
    }

    /**
     * Opens the management system for the client session.
     * @returns A promise with the state of the manager.
     */
    async init(): Promise<ManagerState> {
        try {
            if (this.useConfiguredGraphFactory) {
                await this.client.submit(`${this.graphName} = ConfiguredGraphFactory.open('${this.graphName})`);
            }
            await this.client.submit(this.OPEN_MGMT);
            this.state = "INITIALIZED";
            return Promise.resolve(this.state);
        } catch (err) {
            this.state = "ERROR";
            return Promise.reject("ERROR");
        }
    }

    /**
     * Will build only the indices from a graph schema.
     * @param schema - GraphSchema to get index definitions from.
     * @param commit - Whether or not to commit and close the traversal. Default: `false`
     * @returns A promise containing the number of successful traversals made.
     */
    async createIndices(schema: GraphSchema, commit = false): Promise<number> {
        try {
            let count = 0;
            // Generate graph indices.
            count += (
                await Promise.all(
                    schema.graphIndices
                        .map((i) => {
                            const builder = new GraphIndexBuilder(i.name);
                            builder
                                .label(i.label)
                                .type(i.type)
                                .unique(i.unique);
                            i.keys.forEach((k) => builder.key(k));
                            return builder.build();
                        })
                        .map((msg) => this.client.submit(msg))
                )
            ).length;
            // Generate vc indices.
            count += (
                await Promise.all(
                    schema.vcIndices
                        .map((i) => {
                            const builder = new VertexCentricIndexBuilder(
                                i.name
                            );
                            builder
                                .direction(i.direction)
                                .edgelabel(i.edgelabel)
                                .order(i.order);
                            i.keys.forEach((k) => builder.key(k));
                            return builder.build();
                        })
                        .map((msg) => this.client.submit(msg))
                )
            ).length;
            if (commit) {
                await this.commit();
            }
            return Promise.resolve(count);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Creates all the schema definitions.
     * @param schema - GraphSchema to get schema definitions from.
     * @param indices - If set `true`, will build indices as well. Default `false`.
     * @returns A promise containing the number of successful traversals made.
     */
    async createSchema(schema: GraphSchema, indices = false): Promise<number> {
        try {
            let count = 0;
            // Extract/Build our properties definitions.
            count += (
                await Promise.all(
                    [...schema.vertices, ...schema.edges]
                        .flatMap((v) => v.properties)
                        .map((p) => {
                            const builder = new PropertyBuilder(p.key);
                            return builder
                                .datatype(p.datatype)
                                .cardinality(p.cardinality)
                                .build();
                        })
                        .map((msg) => this.client.submit(msg))
                )
            ).length;
            // Create labels and associate properties for vertices.
            count += (
                await Promise.all(
                    schema.vertices
                        .map((v) => {
                            const builder = new VertexBuilder(v.label);
                            v.properties.forEach((p) => builder.property(p));
                            return builder.build();
                        })
                        .map((msg) => this.client.submit(msg))
                )
            ).length;
            // Create labels and associate properties for edges.
            count += (
                await Promise.all(
                    schema.edges
                        .map((e) => {
                            const builder = new EdgeBuilder(e.label);
                            e.properties.forEach((p) => builder.property(p));
                            return builder.build();
                        })
                        .map((msg) => this.client.submit(msg))
                )
            ).length;
            if (indices) {
                count += await this.createIndices(schema);
            }
            await this.commit();
            return Promise.resolve(count);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async commit(message?: string): Promise<unknown> {
        try {
            const close = await this.client.submit(`${message ?? ""}mgmt.commit();`);
            this.state = "CLOSED";
            return close;
        } catch (err) {
            this.state = "ERROR";
            return Promise.reject(err);
        }
    }
}
