module.exports = (req, res, next) => {
    res.status(401).json({message: 'You must be logged in to do that'});
}