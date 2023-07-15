const languageUtil = require('../utils/language.util')
const languagesConfig = require('../configs/languages.config')

const languageController = {
    get: (req, res) => {
        //const platform = req.query.platform;
        //const version = req.query.version;

        languageUtil.getDownloadUrls(
            languagesConfig.ruby.releasesUrl, 
            languagesConfig.ruby.downloadUrl
        )
        .then(releases => {
            res.send(releases)
        })
        .catch(error => {
            console.error(error)
        });
    }
}
  
module.exports = languageController
