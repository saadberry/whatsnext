# What's next?

![image](https://github.com/user-attachments/assets/4ea4c8e0-506f-47bd-9dda-5e7b9047f85f)

<i>"Don't stop when you're tired. Stop when you're done." </i>

"What's next?" aims to be a minimislitc todo app, pushing the user to constant tunnel vision - to help them strike procrastination.

### Link: https://whatsnext-blond.vercel.app/

### Screenshots
![WhatsApp Image 2024-12-24 at 13 45 54_1c357da7](https://github.com/user-attachments/assets/ea51c975-6fb7-4d5b-86ad-4cf1fd79c969)

## Setting up project
- Clone this repo
    - <b> Server </b>
      - Head to `/server` and run `npm install` (this ensures you have all the necesary packages)
      - To start the development server, run `npm run dev` - This should fire up the server 🚀
    - <b> WebApp </b>
       - Head to `/webapp` and run `npm install` (this ensures you have all the necesary packages)
       - To start the app, run `npm run dev` 🚀

## API documentation
1. POST `/v1/api/user/signup`
```
Endpoint handling Signup.
Expects the following parameters:
  - Name
  - Email
  - Password 
```
2. POST `/v1/api/user/login`
```
Endpoint handling Login
Expects the following parameters:
  - Email
  - Password 
```
3. POST `/v1/api/todo/`
```
Endpoint handling Todo creation
Expects the following parameters:
  - Title
  - Description 
```
4. GET `/v1/api/todo/`
```
Endpoint that fetches a user's todo's 
```
5. PUT `/v1/api/todo/`
```
Endpoint handling Todo updation
Expects the following parameters:
  - Title
  - Description
  - Status
```
4. DELETE `/v1/api/todo/`
```
Endpoint handling Todo deletion
Expects the following parameters:
  - Id of record
```