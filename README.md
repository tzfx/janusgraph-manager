# JanusGraph Manager (for JavaScript/Typescript)

## About

Apache and Tinkerpop manage the code for the gremlin language variant for JS, however there doesn't appear to be any libraries for managing JanusGraph in javascript.  

This project's goal is to have a JS/TS management library for JanusGraph, letting the user build and manage graphs, schemas, and indices. The only dependency is gremlin, as we will use the language variant client to send commands to the JG instance.  

Information for interacting directly with the JG API can be found here: <https://docs.janusgraph.org/master/operations/management/>. This library uses the gremlin client to directly interact with this API.

## Commands

- To install dependencies: `npm i`
- To compile js: `npm run build`
- To run tests: `npm run test`
- To lint: `npm run lint` or `npm run lint:fix`

# Acknowledgements

- Apache Cassandra, Apache Lucene, Apache, Lucene, Solr, TinkerPop, and Cassandra are trademarks of the Apache Software Foundation or its subsidiaries in Canada, the United States and/or other countries.

- JanusGraph is a trademark of The Linux Foundation.
