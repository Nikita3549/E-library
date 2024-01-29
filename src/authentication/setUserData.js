const setData = {
    setCookie(req, res){
        res.cookie('userEmail', req.body.email);
        res.cookie('max-age', 3600 * 400);
    },
    setInDB(req, res, dbConnection){
        dbConnection.then(conn => conn.query(`INSERT INTO Users (userName, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}')`))
    }
}

module.exports = function setUserData(req, res, dbConnection){
    if (!req.body) return;

    setData.setInDB(req, res, dbConnection);
    setData.setCookie(req, res);
    
    res.send(JSON.stringify({
        status: 'success',
        message: 'User registred'
    }));
}