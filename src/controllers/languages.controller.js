// ===========  LPTA CODE ===========

// const languageUtil = require('../utils/language.util')

// const languagesController = {
//     get: (req, res) => {
//         languageUtil.getLatestDownloadUrl('https://www.ruby-lang.org/en/downloads/releases/', 'https://cache.ruby-lang.org/pub/ruby/', /\/pub\/ruby\/([\d.]+)/)
//         .then(latestReleaseLink => {
//             res.send(latestReleaseLink)
//         })
//         .catch(error => {
//             console.error(error)
//         });
//     }
// }

// module.exports = languagesController;
// ===========  greW CODE ===========

const languagesController = {
  get: (req, res) => {
    const platform = req.query.platform;
    const version = req.query.version;
    res.json({
      platform: platform,
      version: version,
    });
  },
};

module.exports = languagesController;
