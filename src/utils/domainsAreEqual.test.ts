import { expect, test } from 'vitest'
import { isAlchemyUrl, isInfuraUrl } from './domainsAreEqual'

test('matches infura url', () => {
    const isInfura = isInfuraUrl(new URL('https://goerli.infura.io/v3/${INFURA_API_KEY}'))
    expect(isInfura).to.be.true
})

test('rejects non infura url', () => {
    const isInfura = isInfuraUrl(new URL('https://rpc.goerli.mudit.blog/'))
    expect(isInfura).to.be.false
})

test('matches alchemy url', () => {
    const isInfura = isAlchemyUrl(new URL('https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'))
    expect(isInfura).to.be.true
})

test('rejects non alchemy url', () => {
    const isInfura = isAlchemyUrl(new URL('https://rpc.goerli.mudit.blog/'))
    expect(isInfura).to.be.false
})