const languageUtil = require('../utils/language.util')
const languagesConfig = require('../configs/languages.config')

const languageController = {
    get: (req, res) => {
        const platform = req.query.platform

        if(!platform) { return res.status(400).send('Missing required argument: platform') }
        
        if(!['windows', 'macos', 'linux'].includes(platform)) { return res.status(400).send('Invalid required argument: platform') }

        if(!languagesConfig[req.params.id]) { return res.status(404).send(`The requested resource with ID ${req.params.id} does not exist.`) }

        languageUtil.getDownloads(
            languagesConfig[req.params.id].name,
            languagesConfig[req.params.id].releasesUrl, 
            languagesConfig[req.params.id].downloadUrl,
            languagesConfig[req.params.id].versionRegex,
            languagesConfig[req.params.id].extensions,
            platform,
        )
        .then(({ latestRelease, releases }) => {
            res.status(200).send({
                'id': req.params.id,
                'name': languagesConfig[req.params.id].name,
                'currentVersion': latestRelease,
                'imageUrl': `http://localhost:3000${languagesConfig[req.params.id].imageUrl}`,
                'downloadUrls': releases,
            })
        })
        .catch(error => {
            console.error(error)
            res.status(500).send('Internal Server Error')
        })
    }
}
  
module.exports = languageController