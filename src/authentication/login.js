module.exports = {
    handle(req, res, dbConnection){
        this.req = req;
        this.res = res;
        this.dbConnection = dbConnection;

        this.isEmailPasswordExistsInDB()
        this.setCookie(req, res);
    },
    async isEmailPasswordExistsInDB(){
        try{
            await this.dbConnection
            .then(conn => conn.query(`SELECT COUNT(*) FROM Users WHERE email = "${this.req.body.email}"
                                                                AND password = "${this.req.body.password}"`))
            .then(([ rows ]) => {
                if (rows[0]['COUNT(*)'] === 0) throw new Error("db hasn't this email")
                console.log(rows[0]['COUNT(*)'])

                this.res.send(JSON.stringify({
                    status: 'succes',
                    message: 'User was authorized'
                }));
            });
        } catch {
            this.res.send(JSON.stringify({
                status: 'error',
                message: 'User was not authorized'
            }));
        }
    },
    setCookie(req, res){
        res.cookie('userEmail', req.body.email);
        res.cookie('max-age', 3600 * 400);
    }
}
// Обработать ошибку