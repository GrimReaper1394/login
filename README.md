This is a server for a login and signup page meant for tackling King James challenge

It has contraints...namely the frontend is nonfunctional. I was unable to get it to work.

Firstly, It was a hard port from my old server which was running on momngoDB as the challenge required MySQL changes had to be made
Furthermore the html page doesnt retrieve data or post data. I was unable to get that functionality going.

I added JWT to the process to make things a bit secure. Instead a token would be sent out upon registering and signing in. 
Passwords remained hashed as requested
========================================================================================================================================

To run the server 

ensure that mysql server is running on pc and configure sequelize.js to parameters of server

then 

npm i

npm run server

======================== 

Launch Postman, responses from server at this stage will be json 

=============================
Server will run at localhost:5000
====================================
Register User POST

localhost:5000/api/users


to register user follow the following json structure
{
    "name" :            ,
    "surname" :         ,
    "email" :           ,
    "password" :        
}

==========================================================
Login User POST

localhost:5000/api/auth


to login user follow the following json structure
{
    "email" :           ,
    "password" :        
}

=========================================================================

Note, the response of successful signup and login will be in the form of a JWT token.