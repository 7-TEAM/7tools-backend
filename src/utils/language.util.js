const axios = require('axios')
const cheerio = require('cheerio')

function compareVersions(version1, version2) {
  for (let i = 0; i < Math.max(version1.length, version2.length); i++) {
    const num1 = version1[i] || 0
    const num2 = version2[i] || 0

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

function getDownloads(name, url, selector, versionRegex, extensions, platform) {
  return new Promise((resolve, reject) => {
    const validExtension = extensions[platform]

    let releases = []
    
    axios.get(url)
      .then(response => {
        const $ = cheerio.load(response.data)

        $(`a[href^="${selector}"]`).each((index, element) => {
          let href = $(element).attr('href')
          if (name === 'go') href = url + href.replace('/dl/', '')

          if (href.endsWith(validExtension)) {
            releases.push(href)
          }
        })

        let latestRelease = ""

        for (const release of releases) {
          const match = release.match(versionRegex)
          if (match) {
            const version = match[1]
            const versionNumbers = version.split('.').map(Number)
            const latestNumbers = latestRelease.split('.').map(Number)

            if (compareVersions(versionNumbers, latestNumbers) > 0) {
              latestRelease = version
            }
          }
        }

        resolve({ latestRelease, releases })
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}

function getLatestDownload(name, url, selector, versionRegex, extensions, platform) {
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
            const versionNumbers = version.split('.').map(Number)
            const latestNumbers = latestRelease.split('.').map(Number)

            if (compareVersions(versionNumbers, latestNumbers) > 0) {
              latestRelease = version
              latestReleaseLink = release
            }
          }
        }

        if (name === 'go') latestReleaseLink = url + latestReleaseLink.replace('/dl/', '')

        resolve({ latestRelease, latestReleaseLink })
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}

module.exports.getDownloads = getDownloads
module.exports.getLatestDownload = getLatestDownload