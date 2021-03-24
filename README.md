# JanusGraph Manager (for JavaScript/Typescript)

## About

Apache and Tinkerpop manage the code for the gremlin language variant for JS, however there doesn't appear to be any libraries for managing JanusGraph in javascript.  

[express-cassandra](https://github.com/masumsoft/express-cassandra) exists, but mainly deals with cassandra, with basic support for creating model and index schemas for JG. Also, it appears to be unmaintained and is missing some of the newer JG features.  

This project's goal is to have a JS/TS management library for JanusGraph, letting the user build and manage graphs, schemas, and indices. The only dependency is gremlin, as we will use the language variant client to send commands to the JG instance.  

## Commands

- To install dependencies: `npm i`
- To compile js: `npm run build`
- To generate minified bundle: `npm run package`