## What is middleware?

`Middleware` functions are functions that have access to the request object(req) , the response object(res), and the next middleware function in the application's requests-response cycle. 

The next middleware function commanly denoted by variable `next`.

### Middleware functions can perform:

* Execute any code.
* Make changes to the request and the response objects.
* End the request-response cycle.
* Call the next middleware function in the stack.

If the current middleware is not functioning then it must call next middle ware otherwise request will be left hanging.