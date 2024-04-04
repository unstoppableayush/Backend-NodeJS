## Uploading Files with NodeJS and Multer

- installed EJS , Express and Multer Packages
- Created a Form in ejs
- Added action="folder" , method+"post" and erictype="multipart/form-data" in form
- A form can have data + files so must use enctype.
- Use middileware `express.urlencoded({}) which helps to parse the form data.
- Using disk storage to get full control on files.
- We can store `req.file.path` to the database to get the files easily.
- We use `upload.single` to upload single image.
- We can use `upload.array` and `upload.fields` to upload multiple files.