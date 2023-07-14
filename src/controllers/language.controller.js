const languageController = {
    get: (req, res) => {
        res.send(`ID: ${req.params.id}`)
    }
}
  
module.exports = languageController;