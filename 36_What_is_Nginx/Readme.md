# What is Nginx (Engine-X)?

- NGINX is a powerful web server and uses a non-threaded , event-driven architecture.

- It can also do other important things ,such as `load balancing` , and `HTTP caching`, or be used as a `reverse proxy`.

- Forward Proxy
    - When multiple clients connecting to VPN Sever. And VPN sever is connecting to a server.
    - Only one client for server i.e. VPN.

- Reverse Proxy:
    - When a clinet is connecting a VPN server and that vpn is connecting to multiple servers.
    - Users don't know request will be serve to which server.

- Reverse Proxy:
    - Nginx decides your request will be serve to which server.
- Load Balance - distribute the load.
- Http Cache - make cache to reduce req-res cycle.

- Advantage:
    - Can handle 10000 concurrent requests
    - Cache HTTP requests
    - Act as Reverse Proxy
    - Act as Load Balancer
    - Act as an API Gateway
    - Serve and Cache Static files like images, Videos, etc
    - Handle SSL Certificates

- Prerequisite
    - Docker , Basic Linux Commands , Containerization