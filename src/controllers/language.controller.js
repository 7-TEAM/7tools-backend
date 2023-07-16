const languageUtil = require('../utils/language.util')
const languagesConfig = require('../configs/languages.config')

const languageController = {
    get: (req, res) => {
        const platform = req.query.platform;

        languageUtil.getDownloadUrls(
            languagesConfig[req.params.id].name,
            languagesConfig[req.params.id].releasesUrl, 
            languagesConfig[req.params.id].downloadUrl,
            languagesConfig[req.params.id].extensions,
            platform,
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