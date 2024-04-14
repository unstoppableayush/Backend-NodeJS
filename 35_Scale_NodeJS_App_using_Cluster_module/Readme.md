# Scale NodeJS application using the cluster module

- Multiple users concurrently accesing the server then Workload increases.
- When users increases then we can use clusters.
- We distribute the workload on server into multiple apllication threads of nodejs.
- We can make worker threads as no of cpus. 
- When we use cluster it divides assigns the diifferent work with diffirent threads in nodejs in round robin fashion to distribute the workload. 