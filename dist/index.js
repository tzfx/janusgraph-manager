/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/builders/EdgeBuilder.ts":
/*!*************************************!*\
  !*** ./src/builders/EdgeBuilder.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EdgeBuilder = void 0;
class EdgeBuilder {
    constructor(_label) {
        this._label = _label;
        this._multiplicity = "MULTI";
        this._properties = [];
    }
    multiplicity(multiplicity) {
        this._multiplicity = multiplicity;
        return this;
    }
    property(property) {
        if (this._properties.some((p) => p.key === property.key))
            return this;
        this._properties.push(property);
        return this;
    }
    build() {
        let output = `if (!mgmt.containsEdgeLabel('${this._label}')) `;
        output += `mgmt.makeEdgeLabel('${this._label}')`;
        output +=
            this._multiplicity != null
                ? `.multiplicity(${this._multiplicity})`
                : "";
        output += ".make();";
        if (this._properties.length > 0) {
            output += "mgmt.addProperties(";
            output += `mgmt.getEdgeLabel('${this._label}'), `;
            output += [...this._properties]
                .map((prop) => `mgmt.getPropertyKey('${prop.key}')`)
                .join(", ");
            output += ")";
        }
        return output;
    }
}
exports.EdgeBuilder = EdgeBuilder;


/***/ }),

/***/ "./src/builders/EnableIndexBuilder.ts":
/*!********************************************!*\
  !*** ./src/builders/EnableIndexBuilder.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnableIndexBuilder = void 0;
class EnableIndexBuilder {
    constructor(_name, _graph = 'graph') {
        this._name = _name;
        this._graph = _graph;
    }
    type(type) {
        this._type = type;
        return this;
    }
    label(label) {
        if (this._type !== 'VertexCentric') {
            console.warn(`Label ${label} set on EnableIndex builder. This only applies for VertexCentric indices.`);
        }
        this._label = label;
        return this;
    }
    build() {
        let output = 'mgmt.updateIndex(';
        if (this._type === 'VertexCentric') {
            if (this._label == null || this._label === '')
                throw Error(`Vertex Centric index '${this._name}' attempted to be enabled without a label definition.`);
            output += `mgmt.getRelationIndex(${this._graph}, '${this._name}', '${this._label}')`;
        }
        else {
            output += `mgmt.getGraphIndex('${this._name}')`;
        }
        output += `, SchemaAction.ENABLE_INDEX);`;
        return output;
    }
}
exports.EnableIndexBuilder = EnableIndexBuilder;


/***/ }),

/***/ "./src/builders/GraphIndexBuilder.ts":
/*!*******************************************!*\
  !*** ./src/builders/GraphIndexBuilder.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphIndexBuilder = void 0;
class GraphIndexBuilder {
    constructor(_name) {
        this._name = _name;
        this._keys = [];
    }
    type(type) {
        this._type = type;
        return this;
    }
    key(key) {
        if (this._keys.some((k) => k.field === key.field))
            return this;
        this._keys.push(key);
        return this;
    }
    unique(unique = false) {
        this._unique = unique;
        return this;
    }
    label(label) {
        this._label = label;
        return this;
    }
    build() {
        if (this._keys.length === 0) {
            throw Error(`Unable to generate index ${this._name} with no key definitions.`);
        }
        let output = `if (!mgmt.containsGraphIndex('${this._name}')) `;
        output += `mgmt.buildIndex('${this._name}', Vertex.class)`;
        output += [...this._keys]
            .map((key) => `.addKey(mgmt.getPropertyKey('${key.field}')${this._type === 'Mixed'
            ? `Mapping.${key.mapping}.asParameter()`
            : ''})`)
            .join('');
        output += this._unique ? `.unique()` : '';
        output +=
            this._label != null
                ? `.indexOnly(mgmt.getVertexLabel('${this._label}'))`
                : '';
        return output.concat(this._type === 'Mixed'
            ? '.buildMixedIndex("search");'
            : '.buildCompositeIndex();');
    }
}
exports.GraphIndexBuilder = GraphIndexBuilder;


/***/ }),

/***/ "./src/builders/PropertyBuilder.ts":
/*!*****************************************!*\
  !*** ./src/builders/PropertyBuilder.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PropertyBuilder = void 0;
class PropertyBuilder {
    constructor(_key) {
        this._key = _key;
        this._cardinality = "SINGLE";
    }
    cardinality(cardinality) {
        this._cardinality = cardinality;
        return this;
    }
    datatype(datatype) {
        this._datatype = datatype;
        return this;
    }
    build() {
        let output = `if (!mgmt.containsPropertyKey('${this._key}')) `;
        output += `mgmt.makePropertyKey('${this._key}')`;
        output +=
            this._datatype != null ? `.dataType(${this._datatype}.class)` : "";
        output +=
            this._cardinality != null
                ? `.cardinality(Cardinality.${this._cardinality})`
                : "";
        return output.concat(".make();");
    }
}
exports.PropertyBuilder = PropertyBuilder;


/***/ }),

/***/ "./src/builders/VertexBuilder.ts":
/*!***************************************!*\
  !*** ./src/builders/VertexBuilder.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VertexBuilder = void 0;
class VertexBuilder {
    constructor(_label) {
        this._label = _label;
        this._properties = [];
    }
    property(property) {
        if (this._properties.some((p) => p.key === property.key))
            return this;
        this._properties.push(property);
        return this;
    }
    build() {
        let output = `if (!mgmt.containsVertexLabel('${this._label}')) `;
        output += `mgmt.makeVertexLabel('${this._label}')`;
        output += '.make();';
        if (this._properties.length > 0) {
            output += 'mgmt.addProperties(';
            output += `mgmt.getVertexLabel('${this._label}'), `;
            output += [...this._properties]
                .map((prop) => `mgmt.getPropertyKey('${prop.key}')`)
                .join(', ');
            output += ')';
        }
        return output;
    }
}
exports.VertexBuilder = VertexBuilder;


/***/ }),

/***/ "./src/builders/VertexCentricIndexBuilder.ts":
/*!***************************************************!*\
  !*** ./src/builders/VertexCentricIndexBuilder.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VertexCentricIndexBuilder = void 0;
class VertexCentricIndexBuilder {
    constructor(_name) {
        this._name = _name;
        this._keys = new Set();
        this._order = "asc";
    }
    edgelabel(edgelabel) {
        this._edgelabel = edgelabel;
        return this;
    }
    direction(direction) {
        this._direction = direction;
        return this;
    }
    order(order) {
        this._order = order;
        return this;
    }
    key(key) {
        this._keys.add(key);
        return this;
    }
    build() {
        if (this._keys.size === 0) {
            throw Error(`Unable to generate vc index ${this._name} with no key definitions.`);
        }
        if (this._direction == null) {
            throw Error(`Unable to generate vc index ${this._name} with no directionality.`);
        }
        if (this._edgelabel == null || this._edgelabel === '') {
            throw Error(`Unable to generate vc index ${this._name} with no edge label.`);
        }
        let output = `if (!mgmt.containsGraphIndex('${this._name}')) `;
        output += `mgmt.buildEdgeIndex(`;
        output += `mgmt.getEdgeLabel('${this._edgelabel}'), `;
        output += `'${this._name}', `;
        output += `Direction.${this._direction}, `;
        output += `Order.${this._order}, `;
        output += [...this._keys]
            .map((key) => `mgmt.getPropertyKey('${key}')`)
            .join(", ");
        return output.concat(");");
    }
}
exports.VertexCentricIndexBuilder = VertexCentricIndexBuilder;


/***/ }),

/***/ "./src/builders/index.ts":
/*!*******************************!*\
  !*** ./src/builders/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./EdgeBuilder */ "./src/builders/EdgeBuilder.ts"), exports);
__exportStar(__webpack_require__(/*! ./EnableIndexBuilder */ "./src/builders/EnableIndexBuilder.ts"), exports);
__exportStar(__webpack_require__(/*! ./GraphIndexBuilder */ "./src/builders/GraphIndexBuilder.ts"), exports);
__exportStar(__webpack_require__(/*! ./PropertyBuilder */ "./src/builders/PropertyBuilder.ts"), exports);
__exportStar(__webpack_require__(/*! ./VertexBuilder */ "./src/builders/VertexBuilder.ts"), exports);
__exportStar(__webpack_require__(/*! ./VertexCentricIndexBuilder */ "./src/builders/VertexCentricIndexBuilder.ts"), exports);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./src/JanusGraphManager.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JanusGraphManager = void 0;
const builders_1 = __webpack_require__(/*! ./builders */ "./src/builders/index.ts");
class JanusGraphManager {
    constructor(client, options) {
        this.client = client;
        this.options = options;
        this.state = 'NEW';
        this.OPEN_MGMT = `mgmt = ${this.options.graphName}.openManagement();0;`;
        if (options.graphName == null) {
            this.options.graphName = 'graph';
        }
        if (options.useConfiguredGraphFactory == null) {
            this.options.useConfiguredGraphFactory = false;
        }
    }
    async init() {
        try {
            if (this.state !== 'READY') {
                if (this.options.useConfiguredGraphFactory) {
                    await this.client.submit(`${this.options.graphName} = ConfiguredGraphFactory.open('${this.options.graphName}');0;`);
                }
                else if (this.options.configPath != null) {
                    await this.client.submit(`${this.options.graphName} = JanusGraphFactory.open('${this.options.configPath}');0;`);
                }
                await this.client.submit(this.OPEN_MGMT);
                this.state = 'READY';
            }
            return Promise.resolve(this.state);
        }
        catch (err) {
            this.state = 'ERROR';
            return Promise.reject(err);
        }
    }
    async createGraphIndex(index, commit = false) {
        const builder = new builders_1.GraphIndexBuilder(index.name);
        builder.label(index.label).type(index.type).unique(index.unique);
        index.keys.forEach((k) => builder.key(k));
        try {
            await this.client.submit(builder.build());
            if (commit)
                await this.commit();
            return Promise.resolve(1);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async createVertexCentricIndex(index, commit = false) {
        const builder = new builders_1.VertexCentricIndexBuilder(index.name);
        builder
            .direction(index.direction)
            .edgelabel(index.edgelabel)
            .order(index.order);
        index.keys.forEach((k) => builder.key(k));
        try {
            await this.client.submit(builder.build());
            if (commit)
                await this.commit();
            return Promise.resolve(1);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async createIndices(schema, commit = false) {
        try {
            this.init();
            let count = 0;
            count += (await Promise.all(schema.graphIndices.map((i) => this.createGraphIndex(i, commit)))).length;
            count += (await Promise.all(schema.vcIndices.map((i) => this.createVertexCentricIndex(i, commit)))).length;
            if (commit) {
                await this.commit();
            }
            return Promise.resolve(count);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async enableIndices(schema, commit = false) {
        try {
            this.init();
            const gi = schema.graphIndices.map((i) => {
                const builder = new builders_1.EnableIndexBuilder(i.name, schema.name);
                return builder.build();
            });
            const vci = schema.vcIndices.map((i) => {
                const builder = new builders_1.EnableIndexBuilder(i.name, schema.name);
                return builder.type('VertexCentric').label(i.edgelabel).build();
            });
            const count = [...gi, ...vci].map((msg) => this.client.submit(msg))
                .length;
            if (commit) {
                await this.commit();
            }
            return Promise.resolve(count);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async createSchema(schema, indices = false) {
        try {
            this.init();
            let count = 0;
            count += (await Promise.all([...schema.vertices, ...schema.edges]
                .flatMap((v) => v.properties)
                .map((p) => {
                const builder = new builders_1.PropertyBuilder(p.key);
                return builder
                    .datatype(p.datatype)
                    .cardinality(p.cardinality)
                    .build();
            })
                .map((msg) => this.client.submit(msg)))).length;
            count += (await Promise.all(schema.vertices
                .map((v) => {
                const builder = new builders_1.VertexBuilder(v.label);
                v.properties.forEach((p) => builder.property(p));
                return builder.build();
            })
                .map((msg) => this.client.submit(msg)))).length;
            count += (await Promise.all(schema.edges
                .map((e) => {
                const builder = new builders_1.EdgeBuilder(e.label);
                e.properties.forEach((p) => builder.property(p));
                return builder.build();
            })
                .map((msg) => this.client.submit(msg)))).length;
            if (indices) {
                await this.commit();
                count += await this.createIndices(schema);
            }
            return Promise.resolve(count);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async commit(message) {
        try {
            this.init();
            const commit = await this.client.submit(`${message ?? ''};mgmt.commit();`);
            this.state = 'COMMIT';
            return commit;
        }
        catch (err) {
            this.state = 'ERROR';
            return Promise.reject(err);
        }
    }
    async close() {
        try {
            if (['CLOSED', 'ERROR'].some((s) => s === this.state))
                return;
            const close = await this.client.close();
            this.state = 'CLOSED';
            return close;
        }
        catch (err) {
            this.state = 'ERROR';
            return Promise.reject(err);
        }
    }
}
exports.JanusGraphManager = JanusGraphManager;

})();

exports.janusgraphmanager = __webpack_exports__;
/******/ })()
;