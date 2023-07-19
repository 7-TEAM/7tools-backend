const languageUtil = require('../utils/language.util')
const languagesConfig = require('../configs/languages.config')

const languagesController = {
    get: async (req, res) => {
        const platform = req.query.platform
        
        let languages = []

        if(!platform) { return res.status(400).send('Missing required argument: platform') }
        
        if(!['windows', 'macos', 'linux'].includes(platform)) { return res.status(400).send('Invalid required argument: platform') }

        try {
            await Promise.all(Object.entries(languagesConfig).map(async ([key, nestedObj]) => {
                let language = {}

                Object.entries(nestedObj).forEach(([nestedKey, value]) => {
                    language[nestedKey] = value
                });

                const { latestRelease, latestReleaseLink } = await languageUtil.getLatestDownload(
                    language.name,
                    language.releasesUrl,
                    language.downloadUrl,
                    language.versionRegex,
                    language.extensions,
                    platform
                );
                
                languages[key] = {
                    'id': key,
                    'name': languagesConfig[key].name,
                    'currentVersion': latestRelease,
                    'imageUrl': `http://localhost:3000${languagesConfig[key].imageUrl}`,
                    'currentVersion': {
                        'iteration': latestRelease,
                        'url': latestReleaseLink,
                    },
                }
            }))

            res.status(200).send(languages)
        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }
}

module.exports = languagesController;