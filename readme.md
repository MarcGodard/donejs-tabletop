# tabletop

Welcome to the tabletop DoneJS application! This is a bare-bone tabletop with draggable windows app.

#### Todo:
- [ ] Save window position and size for reopen
- [ ] Be able to pre-crate windows
- [ ] Minimize / expand windows
- [ ] Pre-set layouts
- [ ] Update canJS to version 3.3 and other libraries

## Getting started

To install all dependencies, (e.g. after cloning it from a Git repository) run

```
npm install donejs -g
npm install
```

## Running tests

Tests can be run with

```
donejs test
``

## Development mode

Development mode can be started with

```
donejs develop
```

## Build and production mode

To build the application into a production bundle run

```
donejs build
```

In Unix environment the production application can be started like this:

```
NODE_ENV=production npm start
```