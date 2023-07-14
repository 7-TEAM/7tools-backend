const languageUtil = require('../utils/language.util')

const languageController = {
    get: (req, res) => {
        languageUtil.getDownloadUrls('https://www.ruby-lang.org/en/downloads/releases/', 'https://cache.ruby-lang.org/pub/ruby/')
        .then(releases => {
            res.send(releases)
        })
        .catch(error => {
            console.error(error)
        });
    }
}
  
module.exports = languageController