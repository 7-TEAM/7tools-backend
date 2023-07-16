const languageUtil = require('../utils/language.util')
const languagesConfig = require('../configs/languages.config')

const languagesController = {
    get: async (req, res) => {
        const platform = req.query.platform;
        
        let languagesReleases = [];

        try {
            await Promise.all(Object.entries(languagesConfig).map(async ([key, nestedObj]) => {
                let language = {};

                Object.entries(nestedObj).forEach(([nestedKey, value]) => {
                    language[nestedKey] = value;
                });

                const latestReleaseLink = await languageUtil.getLatestDownloadUrl(
                    language.name,
                    language.releasesUrl,
                    language.downloadUrl,
                    language.versionRegex,
                    language.extensions,
                    platform
                );

                languagesReleases.push(latestReleaseLink);
            }));

            res.send(languagesReleases);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = languagesController;