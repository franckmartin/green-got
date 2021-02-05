# Green Got | Technical Test

## Code

- Cross-origin resource sharing (CORS) is enabled by the [Cors](https://joi.dev/) Express middleware.
- Request body is validated with [Joi](https://joi.dev/) data validator.
- The API uses the 200, 404, 405 and 422 status codes. Error messages are sent in the response body.

## Test

```shell
npm run test
```

- Tests are written in a BDD (Behavior Driven Development) fashion.
- Tests are implemented with [Mocha](https://mochajs.org/) test framework and [Chai](https://www.chaijs.com/) assertion library.
- Testing requires a live server. By default http://localhost:3000, can be updated in .mocharc

## Live

- A [live version](https://green-got-franck.vercel.app/) is available on the Vercel cloud.
