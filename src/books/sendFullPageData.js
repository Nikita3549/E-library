class fullPageData{
    constructor(req, res, dbConnection){
        this.req = req;
        this.res = res;
        this.dbConnection = dbConnection;
    }   
    handle(){
        this.dbConnection
        .then(conn => conn.query(`SELECT * FROM books WHERE id = ${this.req.params.bookId}`))
        .then(( [ rows ] ) => this.res.send(rows[0]));
    }
}

module.exports = fullPageData;