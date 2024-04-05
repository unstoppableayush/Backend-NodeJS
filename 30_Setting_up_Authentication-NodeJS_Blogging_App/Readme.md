# Setting up Blogging App

- `--dev` use to make Development dependency.
- Dev dependency is required only in development enviornment.
- Ex: `npm i nodemon --dev`
- It will not be used in Production enviornment.
- We haave used `Partials` Folder Which includes all the files which are partial for many other files.
- Steps :
    - Created Models
    - Created Views 
    - Created Router to handle request
    - Hashed the password using crypto library
    - Worked on Signup page
    - Worked on Signin page
    - Signup and signin done
    

# Authentication 

- Created a JWT Token 
- Creation and valiation of JWT token 
- made payload for valid user
- Saved in localstorage
- Created a middleware to check for authentication cookie
- Installed `cookie-parser` library and used it
- Made a route for clear cookie(logout)
- set the token with full name and displayed the full name at username by me
- created blog schema and model
- Made Blog Router And Schema
- Created a blog page
- Stored the blog in database
- Used multer to store the image 
- Used `express.static(path.resolve('./public')` middleware to get access to static files(blog image)
