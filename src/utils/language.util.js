const axios = require('axios')
const cheerio = require('cheerio')

function getDownloadUrls(name, url, selector, extensions, platform) {
  return new Promise((resolve, reject) => {
    const validExtension = extensions[platform]

    let releases = []

    axios.get(url)
      .then(response => {
        const $ = cheerio.load(response.data)

        $(`a[href^="${selector}"]`).each((index, element) => {
          let href = $(element).attr('href')
          if (name === 'go') href = url + href.replace('/dl/', '');

          if (href.endsWith(validExtension)) {
            releases.push(href)
          }
        })

        resolve(releases)
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}

function getLatestDownloadUrl(name, url, selector, versionRegex, extensions, platform) {
  return new Promise((resolve, reject) => {
    const validExtension = extensions[platform]

    let releases = []

    axios.get(url)
      .then(response => {
        const $ = cheerio.load(response.data)

        $(`a[href^="${selector}"]`).each((index, element) => {
          let href = $(element).attr('href')

          if (href.endsWith(validExtension)) {
            releases.push(href)
          }
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

        if (name === 'go') latestReleaseLink = url + latestReleaseLink.replace('/dl/', '');

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