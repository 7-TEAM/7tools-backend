const languages = {
    1: {
        'name': 'ruby',
        'releasesUrl': 'https://www.ruby-lang.org/en/downloads/releases/',
        'downloadUrl': 'https://cache.ruby-lang.org/pub/ruby/',
        'versionRegex':  /\/pub\/ruby\/([\d.]+)/,
        'extensions': {
            'windows': '.tar.gz',
            'macos': '.tar.gz',
            'linux': '.tar.gz',
        },
    },
    2: {
        'name': 'go',
        'releasesUrl': 'https://go.dev/dl/',
        'downloadUrl': '/dl/go',
        'versionRegex': /go(\d+\.\d+\.\d+)/,
        'extensions': {
            'windows': '.msi',
            'macos': '.pkg',
            'linux': '.tar.gz',
        },
    },
}

module.exports = languages