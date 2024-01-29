module.exports = async (req, res, dbConnection, subjectOfComparison) => {
    // if (req.cookies?.userEmail == undefined) return false; 
    try {
        await dbConnection
        .then(conn => conn.query(`SELECT email FROM Users WHERE email = '${subjectOfComparison}'`))
        .then(([ rows ]) => {
            if (rows[0].email !== subjectOfComparison) throw new Error("db hasn't this email")
        })
        return true;
    } catch {
        return false;
    }
}
