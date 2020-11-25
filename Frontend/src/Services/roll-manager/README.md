# Roll Manager service

This is a service to manage the dice rolls, similar to what was accomplished with `Roll.js`

## Note: JSDOC for types

we are going to use JSDoc here to infer and describe types instead of using typescript. See:
- <https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html>
- <https://jsdoc.app/tags-typedef.html>

With this we can have autocomplete support in our editors, as well as some in-editor warnings if we pass the wrong data

## Structure of the service

This service will not be a class, but instead we will expose different functions that will either query the data, or transform the data.

Since these files use JSDOC, which makes for a lot of lines of code, the different functions are separated into different files.

## Files

Here are the files that contain the public functions and error classes, to be used by the rest of the app. 

- [`creation.js`](./creation.js): contains the functions to create a new Data object, one with a blank state and another based on a given state
- [`queries.js`](./queries.js): contains the functions that answers questions about the state of the data
- [`actions.js`](./actions.js): contains the functions that respond to user actions. If they have any effect on the data, they will return a new object, so that react knows that something has changed
- [`errors.js`](./errors.js): contains the different error classes that we may throw

We also have other files with utilities and validations that are to be used only by the Roll Manager service

- [`private/validations.js`](private/validations.js): contains the functions that throw exceptions with invalid state, settings, or data.
- [`private/typedefs.js`](private/typedefs.js): contains the JSDoc with the type definitions of the different objects (data, state, settings, etc)
- [`private/test-utils.js`](__tests__/test-utils.js): contains some functions to simplify our test suite regarding valid sate, settings and data, as well as to check that the public functions do the appropriate validations
