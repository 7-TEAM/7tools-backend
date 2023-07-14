const axios = require('axios')
const cheerio = require('cheerio')

function getDownloadUrls(url, selector) {
  return new Promise((resolve, reject) => {
    let releases = []

    axios.get(url)
      .then(response => {
        const $ = cheerio.load(response.data)

        $(`a[href^="${selector}"]`).each((index, element) => {
          releases.push($(element).attr('href'))
        })

        resolve(releases)
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}

function getLatestDownloadUrl(url, selector, versionRegex) {
  return new Promise((resolve, reject) => {
    let releases = []

    axios.get(url)
      .then(response => {
        const $ = cheerio.load(response.data)

        $(`a[href^="${selector}"]`).each((index, element) => {
          releases.push($(element).attr('href'))
        })

        let latestRelease = ""
        let latestReleaseLink = ""

        for (const release of releases) {
          const match = release.match(versionRegex)
          if (match) {
            const version = match[1]
            if (version > latestRelease) {
              latestRelease = version
              latestReleaseLink = release
            }
          }
        }

        resolve(latestReleaseLink)
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}

module.exports.getDownloadUrls = getDownloadUrls
module.exports.getLatestDownloadUrl = getLatestDownloadUrl