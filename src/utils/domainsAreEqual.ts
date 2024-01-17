function getDomainNameFromHostName(url: URL) {
    const domainNameParts = url.hostname.split('.')
    if (domainNameParts.length < 3) return url.hostname
    const numUrlParts = domainNameParts.length
    return domainNameParts[numUrlParts-2] + '.' + domainNameParts[numUrlParts-1]
}
  
export function domainsAreEqual(url: URL, otherUrl: URL) {
    if (url.hostname === otherUrl.hostname) return true
    const urlDomain = getDomainNameFromHostName(url)
    const otherUrlDomain = getDomainNameFromHostName(otherUrl)
    if (urlDomain === otherUrlDomain) return true
    return false
}

const infuraUrl = new URL('https://infura.io')
export function isInfuraUrl(url: URL){
    return domainsAreEqual(url, infuraUrl)
}

const alchemyUrl = new URL('https://alchemy.com')
export function isAlchemyUrl(url: URL){
    return domainsAreEqual(url, alchemyUrl)
}