```
Client ----------> Server
         Request    (NodeJs)
```

Request made to server. Node js has event queue. 

Firstly requests are queued into event queue . 

Now even loop is a machine which always watches the event queue. 

If event loop get any request in event queue the select that request using fifo(first in first out) principle.

Request can be of two types :
  
  1. Blocking Operations (Sync.. task)
  3. Non- Blockinng Operations (Async.. task)

If the request has `non-blocking operation` then the server process it and sends the response back to the user.

![non-blocking operation in nodejs](./non-blocking.png)

If the request has `blocking operation` then to resolve this request it goes to thread pool. 

Thread pool is a pool of threads . Threads act a worker which work for you . It is resposible for fuilful your blocking operation. If the works completes then it return the result . Then the respose is send back to the user . 

![non-blocking operation in nodejs](./blocking.png)





