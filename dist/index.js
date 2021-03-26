(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("janusgraphmanager", [], factory);
	else if(typeof exports === 'object')
		exports["janusgraphmanager"] = factory();
	else
		root["janusgraphmanager"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/JanusGraphManager.ts":
/*!**********************************!*\
  !*** ./src/JanusGraphManager.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JanusGraphManager = void 0;
var builders_1 = __webpack_require__(/*! ./builders */ "./src/builders/index.ts");
var JanusGraphManager = (function () {
    function JanusGraphManager(client, options) {
        this.client = client;
        this.options = options;
        this.state = "NEW";
        this.OPEN_MGMT = "mgmt = " + this.options.graphName + ".openManagement();0;";
        if (options.graphName == null) {
            this.options.graphName = 'graph';
        }
        if (options.useConfiguredGraphFactory == null) {
            this.options.useConfiguredGraphFactory = false;
        }
    }
    JanusGraphManager.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!this.options.useConfiguredGraphFactory) return [3, 2];
                        return [4, this.client.submit(this.options.graphName + " = ConfiguredGraphFactory.open('" + this.options.graphName + "')")];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        if (!(this.options.configPath != null)) return [3, 4];
                        return [4, this.client.submit(this.options.graphName + " = JanusGraphFactory.open('" + this.options.configPath + ")'")];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4, this.client.submit(this.OPEN_MGMT)];
                    case 5:
                        _a.sent();
                        this.state = "READY";
                        return [2, Promise.resolve(this.state)];
                    case 6:
                        err_1 = _a.sent();
                        this.state = "ERROR";
                        return [2, Promise.reject("ERROR")];
                    case 7: return [2];
                }
            });
        });
    };
    JanusGraphManager.prototype.createIndices = function (schema, commit) {
        if (commit === void 0) { commit = false; }
        return __awaiter(this, void 0, void 0, function () {
            var count, _a, _b, err_2;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        count = 0;
                        _a = count;
                        return [4, Promise.all(schema.graphIndices
                                .map(function (i) {
                                var builder = new builders_1.GraphIndexBuilder(i.name);
                                builder
                                    .label(i.label)
                                    .type(i.type)
                                    .unique(i.unique);
                                i.keys.forEach(function (k) { return builder.key(k); });
                                return builder.build();
                            })
                                .map(function (msg) { return _this.client.submit(msg); }))];
                    case 1:
                        count = _a + (_c.sent()).length;
                        _b = count;
                        return [4, Promise.all(schema.vcIndices
                                .map(function (i) {
                                var builder = new builders_1.VertexCentricIndexBuilder(i.name);
                                builder
                                    .direction(i.direction)
                                    .edgelabel(i.edgelabel)
                                    .order(i.order);
                                i.keys.forEach(function (k) { return builder.key(k); });
                                return builder.build();
                            })
                                .map(function (msg) { return _this.client.submit(msg); }))];
                    case 2:
                        count = _b + (_c.sent()).length;
                        if (!commit) return [3, 4];
                        return [4, this.commit()];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [2, Promise.resolve(count)];
                    case 5:
                        err_2 = _c.sent();
                        return [2, Promise.reject(err_2)];
                    case 6: return [2];
                }
            });
        });
    };
    JanusGraphManager.prototype.enableIndices = function (schema, commit) {
        if (commit === void 0) { commit = false; }
        return __awaiter(this, void 0, void 0, function () {
            var gi, vci, count, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        gi = schema.graphIndices
                            .map(function (i) {
                            var builder = new builders_1.EnableIndexBuilder(i.name, schema.name);
                            return builder.build();
                        });
                        vci = schema.vcIndices
                            .map(function (i) {
                            var builder = new builders_1.EnableIndexBuilder(i.name, schema.name);
                            return builder.type("VertexCentric")
                                .label(i.edgelabel)
                                .build();
                        });
                        count = __spreadArray(__spreadArray([], __read(gi)), __read(vci)).map(function (msg) { return _this.client.submit(msg); }).length;
                        if (!commit) return [3, 2];
                        return [4, this.commit()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2, Promise.resolve(count)];
                    case 3:
                        err_3 = _a.sent();
                        return [2, Promise.reject(err_3)];
                    case 4: return [2];
                }
            });
        });
    };
    JanusGraphManager.prototype.createSchema = function (schema, indices) {
        if (indices === void 0) { indices = false; }
        return __awaiter(this, void 0, void 0, function () {
            var count, _a, _b, _c, _d, err_4;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 7, , 8]);
                        count = 0;
                        _a = count;
                        return [4, Promise.all(__spreadArray(__spreadArray([], __read(schema.vertices)), __read(schema.edges)).flatMap(function (v) { return v.properties; })
                                .map(function (p) {
                                var builder = new builders_1.PropertyBuilder(p.key);
                                return builder
                                    .datatype(p.datatype)
                                    .cardinality(p.cardinality)
                                    .build();
                            })
                                .map(function (msg) { return _this.client.submit(msg); }))];
                    case 1:
                        count = _a + (_e.sent()).length;
                        _b = count;
                        return [4, Promise.all(schema.vertices
                                .map(function (v) {
                                var builder = new builders_1.VertexBuilder(v.label);
                                v.properties.forEach(function (p) { return builder.property(p); });
                                return builder.build();
                            })
                                .map(function (msg) { return _this.client.submit(msg); }))];
                    case 2:
                        count = _b + (_e.sent()).length;
                        _c = count;
                        return [4, Promise.all(schema.edges
                                .map(function (e) {
                                var builder = new builders_1.EdgeBuilder(e.label);
                                e.properties.forEach(function (p) { return builder.property(p); });
                                return builder.build();
                            })
                                .map(function (msg) { return _this.client.submit(msg); }))];
                    case 3:
                        count = _c + (_e.sent()).length;
                        if (!indices) return [3, 5];
                        _d = count;
                        return [4, this.createIndices(schema)];
                    case 4:
                        count = _d + _e.sent();
                        _e.label = 5;
                    case 5: return [4, this.commit()];
                    case 6:
                        _e.sent();
                        return [2, Promise.resolve(count)];
                    case 7:
                        err_4 = _e.sent();
                        return [2, Promise.reject(err_4)];
                    case 8: return [2];
                }
            });
        });
    };
    JanusGraphManager.prototype.commit = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var commit, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.client.submit((message !== null && message !== void 0 ? message : "") + ";mgmt.commit();")];
                    case 1:
                        commit = _a.sent();
                        return [2, commit];
                    case 2:
                        err_5 = _a.sent();
                        this.state = "ERROR";
                        return [2, Promise.reject(err_5)];
                    case 3: return [2];
                }
            });
        });
    };
    JanusGraphManager.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var close, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.client.close()];
                    case 1:
                        close = _a.sent();
                        this.state = "CLOSED";
                        return [2, close];
                    case 2:
                        err_6 = _a.sent();
                        this.state = "ERROR";
                        return [2, Promise.reject(err_6)];
                    case 3: return [2];
                }
            });
        });
    };
    return JanusGraphManager;
}());
exports.JanusGraphManager = JanusGraphManager;


/***/ }),

/***/ "./src/builders/EdgeBuilder.ts":
/*!*************************************!*\
  !*** ./src/builders/EdgeBuilder.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EdgeBuilder = void 0;
var EdgeBuilder = (function () {
    function EdgeBuilder(_label) {
        this._label = _label;
        this._multiplicity = "MULTI";
        this._properties = [];
    }
    EdgeBuilder.prototype.multiplicity = function (multiplicity) {
        this._multiplicity = multiplicity;
        return this;
    };
    EdgeBuilder.prototype.property = function (property) {
        if (this._properties.some(function (p) { return p.key === property.key; }))
            return this;
        this._properties.push(property);
        return this;
    };
    EdgeBuilder.prototype.build = function () {
        var output = "if (!mgmt.containsEdgeLabel('" + this._label + "')) ";
        output += "mgmt.makeEdgeLabel('" + this._label + "')";
        output +=
            this._multiplicity != null
                ? ".multiplicity(" + this._multiplicity + ")"
                : "";
        output += ".make();";
        if (this._properties.length > 0) {
            output += "mgmt.addProperties(";
            output += "mgmt.getEdgeLabel('" + this._label + "'), ";
            output += __spreadArray([], __read(this._properties)).map(function (prop) { return "mgmt.getPropertyKey('" + prop.key + "')"; })
                .join(", ");
            output += ")";
        }
        return output;
    };
    return EdgeBuilder;
}());
exports.EdgeBuilder = EdgeBuilder;


/***/ }),

/***/ "./src/builders/EnableIndexBuilder.ts":
/*!********************************************!*\
  !*** ./src/builders/EnableIndexBuilder.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnableIndexBuilder = void 0;
var EnableIndexBuilder = (function () {
    function EnableIndexBuilder(_name, _graph) {
        if (_graph === void 0) { _graph = 'graph'; }
        this._name = _name;
        this._graph = _graph;
    }
    EnableIndexBuilder.prototype.type = function (type) {
        this._type = type;
        return this;
    };
    EnableIndexBuilder.prototype.label = function (label) {
        if (this._type !== 'VertexCentric') {
            console.warn("Label " + label + " set on EnableIndex builder. This only applies for VertexCentric indices.");
        }
        this._label = label;
        return this;
    };
    EnableIndexBuilder.prototype.build = function () {
        var output = 'mgmt.updateIndex(';
        if (this._type === 'VertexCentric') {
            if (this._label == null || this._label === '')
                throw Error("Vertex Centric index '" + this._name + "' attempted to be enabled without a label definition.");
            output += "mgmt.getRelationIndex(" + this._graph + ", '" + this._name + "', '" + this._label + "')";
        }
        else {
            output += "mgmt.getGraphIndex(" + this._graph + ", '" + this._name + "')";
        }
        output += ", SchemaAction.ENABLE_INDEX);";
        return output;
    };
    return EnableIndexBuilder;
}());
exports.EnableIndexBuilder = EnableIndexBuilder;


/***/ }),

/***/ "./src/builders/GraphIndexBuilder.ts":
/*!*******************************************!*\
  !*** ./src/builders/GraphIndexBuilder.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphIndexBuilder = void 0;
var GraphIndexBuilder = (function () {
    function GraphIndexBuilder(_name) {
        this._name = _name;
        this._keys = [];
    }
    GraphIndexBuilder.prototype.type = function (type) {
        this._type = type;
        return this;
    };
    GraphIndexBuilder.prototype.key = function (key) {
        if (this._keys.some(function (k) { return k.field === key.field; }))
            return this;
        this._keys.push(key);
        return this;
    };
    GraphIndexBuilder.prototype.unique = function (unique) {
        if (unique === void 0) { unique = false; }
        this._unique = unique;
        return this;
    };
    GraphIndexBuilder.prototype.label = function (label) {
        this._label = label;
        return this;
    };
    GraphIndexBuilder.prototype.build = function () {
        if (this._keys.length === 0) {
            throw Error("Unable to generate index " + this._name + " with no key definitions.");
        }
        var output = "if (!mgmt.containsGraphIndex('" + this._name + "')) ";
        output += "mgmt.buildIndex('" + this._name + "', Vertex.class)";
        output += __spreadArray([], __read(this._keys)).map(function (key) {
            return ".addKey(mgmt.getPropertyKey('" + key.field + "'), Mapping." + key.mapping + ".getParameter())";
        })
            .join("");
        output += this._unique ? ".unique()" : "";
        output += this._label != null ? ".indexOnly(mgmt.getVertexLabel('" + this._label + "'))" : "";
        return output.concat(this._type === "Mixed"
            ? '.buildMixedIndex("search");'
            : ".buildCompositeIndex();");
    };
    return GraphIndexBuilder;
}());
exports.GraphIndexBuilder = GraphIndexBuilder;


/***/ }),

/***/ "./src/builders/PropertyBuilder.ts":
/*!*****************************************!*\
  !*** ./src/builders/PropertyBuilder.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PropertyBuilder = void 0;
var PropertyBuilder = (function () {
    function PropertyBuilder(_key) {
        this._key = _key;
        this._cardinality = "SINGLE";
    }
    PropertyBuilder.prototype.cardinality = function (cardinality) {
        this._cardinality = cardinality;
        return this;
    };
    PropertyBuilder.prototype.datatype = function (datatype) {
        this._datatype = datatype;
        return this;
    };
    PropertyBuilder.prototype.build = function () {
        var output = "if (!mgmt.containsPropertyKey('" + this._key + "')) ";
        output += "mgmt.makePropertyKey('" + this._key + "')";
        output +=
            this._datatype != null ? ".dataType(" + this._datatype + ".class)" : "";
        output +=
            this._cardinality != null
                ? ".cardinality(Cardinality." + this._cardinality + ")"
                : "";
        return output.concat(".make();");
    };
    return PropertyBuilder;
}());
exports.PropertyBuilder = PropertyBuilder;


/***/ }),

/***/ "./src/builders/VertexBuilder.ts":
/*!***************************************!*\
  !*** ./src/builders/VertexBuilder.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VertexBuilder = void 0;
var VertexBuilder = (function () {
    function VertexBuilder(_label) {
        this._label = _label;
        this._properties = [];
    }
    VertexBuilder.prototype.property = function (property) {
        if (this._properties.some(function (p) { return p.key === property.key; }))
            return this;
        this._properties.push(property);
        return this;
    };
    VertexBuilder.prototype.build = function () {
        var output = "if (!mgmt.containsVertexLabel('" + this._label + "')) ";
        output += "mgmt.makeVertexLabel('" + this._label + "')";
        output += '.make();';
        if (this._properties.length > 0) {
            output += 'mgmt.addProperties(';
            output += "mgmt.getVertexLabel('" + this._label + "'), ";
            output += __spreadArray([], __read(this._properties)).map(function (prop) { return "mgmt.getPropertyKey('" + prop.key + "')"; })
                .join(', ');
            output += ')';
        }
        return output;
    };
    return VertexBuilder;
}());
exports.VertexBuilder = VertexBuilder;


/***/ }),

/***/ "./src/builders/VertexCentricIndexBuilder.ts":
/*!***************************************************!*\
  !*** ./src/builders/VertexCentricIndexBuilder.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VertexCentricIndexBuilder = void 0;
var VertexCentricIndexBuilder = (function () {
    function VertexCentricIndexBuilder(_name) {
        this._name = _name;
        this._keys = new Set();
        this._order = "asc";
    }
    VertexCentricIndexBuilder.prototype.edgelabel = function (edgelabel) {
        this._edgelabel = edgelabel;
        return this;
    };
    VertexCentricIndexBuilder.prototype.direction = function (direction) {
        this._direction = direction;
        return this;
    };
    VertexCentricIndexBuilder.prototype.order = function (order) {
        this._order = order;
        return this;
    };
    VertexCentricIndexBuilder.prototype.key = function (key) {
        this._keys.add(key);
        return this;
    };
    VertexCentricIndexBuilder.prototype.build = function () {
        if (this._keys.size === 0) {
            throw Error("Unable to generate vc index " + this._name + " with no key definitions.");
        }
        if (this._direction == null) {
            throw Error("Unable to generate vc index " + this._name + " with no directionality.");
        }
        if (this._edgelabel == null || this._edgelabel === '') {
            throw Error("Unable to generate vc index " + this._name + " with no edge label.");
        }
        var output = "if (!mgmt.containsGraphIndex('" + this._name + "')) ";
        output += "mgmt.buildEdgeIndex(";
        output += "mgmt.getEdgeLabel('" + this._edgelabel + "'), ";
        output += "'" + this._name + "', ";
        output += "Direction." + this._direction + ", ";
        output += "Order." + this._order + ", ";
        output += __spreadArray([], __read(this._keys)).map(function (key) { return "mgmt.getPropertyKey('" + key + "')"; })
            .join(", ");
        return output.concat(");");
    };
    return VertexCentricIndexBuilder;
}());
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/JanusGraphManager.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map