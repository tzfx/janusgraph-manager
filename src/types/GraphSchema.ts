import { Edge } from './Edge';
import { Vertex } from './Vertex';
import { GraphIndex } from './GraphIndex';
import { VertexCentricIndex } from './VertexCentricIndex';

export type GraphSchema = {
    name: string;
    vertices: Vertex[];
    edges: Edge[];
    graphIndices: GraphIndex[];
    vcIndices: VertexCentricIndex[];
};
