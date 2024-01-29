const { Router } = require('express');
const authentication = require('./authentication');
const router = Router();
const mysql = require('mysql2/promise');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nikita09022009',
    database: 'booksManagment'
})

router.get('/', (req, res) => {
    authentication.isAuth(req, res, dbConnection, req.cookies.userEmail).then(boolean => {
        if (boolean){
            res.send('main'); // your main html file
            return;
        }

        /* There is code to connect frontend with server */
        res.send(`<button onclick="signup()">signup</button>
        <button onclick="login()">login</button>
        <script>
            async function signup(){
                const res = await fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: 'Nikita', password: 'TestPassword', email: 'newEmail@gmail.com' })
                });
                res.json().then(console.log); // POST request status. Then enough reload user page
            }
            async function login(){
                const res = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: 'newEmail@gmail.com', password: 'TestPassword' })
                })
                res.json().then(console.log); // POST request status. Then enough reload user page
            }
        </script>`) // your signup/login file
    })
});

router.post('/signup', (req, res) => { // url to send user data to signup
    async function asyncWrapper(){
        try{
            await authentication.isAuth(req, res, dbConnection, req.body.email).then(boolean => {
                if (boolean){
                    res.send(JSON.stringify({
                        status: 'error',
                        message: 'User already registred'
                    }));
                    throw new Error('User already registered');
                }
            })
            authentication.setUserData(req, res, dbConnection);
        } catch{}
    };
    asyncWrapper()
});
router.post('/login', (req, res) => { // url to send user data to login
    authentication.login.handle(req, res, dbConnection)
});

module.exports = { router };