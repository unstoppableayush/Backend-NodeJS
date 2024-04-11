# WebSocket

- In general , We send request to the server , server responds to our request and request-response cycle will be closed.
- Communication is single direction. Client request then Server responds (req-res cycle closed)

- Problem :
    - Everytime when user request to the server there is message is available or not. (Chat App)
    - This is called `Polling`. 
    - If message is not available then we are also reuesting to the server
    - Unneccesarly increasing the load to the server.

- Solution :
    - Clinet sent `HTTP` request and tells , i want to make `WebSocket` connection.
    - `Upgrade` Header upgrades `http` connection to `websocket` connection.
    - any one can send message (server <--> Client) (Bidirectional).
    - You don't close the websocket connection unless you want. 
    - WebSocket is just a `protocol`, provides `full-duplex` communication.
    - We don't need `Polling`.


- We use `Socket.io` Library.
