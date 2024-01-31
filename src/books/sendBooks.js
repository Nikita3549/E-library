module.exports = {
    createQueryToDB({ amount, genre, author, from, onlyAvailable }){
        let query = `SELECT * FROM books WHERE id > ${from || 0}`
        
        if (genre){
            query += ` AND genre = '${genre}'`
        }
        if (author){
            query += ` AND author = '${author}'`
        }
        if (onlyAvailable){
            query += ` AND available > '0'`
        }

        query += ` LIMIT ${amount}`

        return query
    },

    async getBooks(req, res, dbConnection, options){
        const query = this.createQueryToDB(options)

        return new Promise((resolve, reject) => {
            dbConnection.then(conn => conn.query(query))
                        .then(( [ rows ] ) => resolve(rows))
        })
    },
    async sendBooks(req, res, dbConnection, options){
        res.send(JSON.stringify(await this.getBooks(req, res, dbConnection, options)));
    }  
}
