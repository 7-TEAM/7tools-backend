const languageUtil = require('../utils/language.util')
const languagesConfig = require('../configs/languages.config')

const languagesController = {
    get: (req, res) => {
        //const platform = req.query.platform;
        //const version = req.query.version;

        languageUtil.getLatestDownloadUrl(
            languagesConfig.ruby.releasesUrl, 
            languagesConfig.ruby.downloadUrl, 
            languagesConfig.ruby.versionRegex
        )
        .then(latestReleaseLink => {
            res.send(latestReleaseLink)
        })
        .catch(error => {
            console.error(error)
        });
    }
}

module.exports = languagesController;