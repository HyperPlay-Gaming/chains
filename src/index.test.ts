import { expect, test } from 'vitest'
import { getChainMetadata, getChainMetadataSync } from './index'


test('get chain metadata infura rpc', async () => {
    const meta = await getChainMetadata('1', {INFURA_API_KEY: 'test_infura'})
    expect(meta.chain.rpc[0]).to.eq('https://mainnet.infura.io/v3/test_infura')
})

test('get chain metadata alchemy rpc', async () => {
    const meta = await getChainMetadata('42161', {ALCHEMY_API_KEY: 'test_alchemy'})
    expect(meta.chain.rpc[0]).to.eq('https://arb-mainnet.g.alchemy.com/v2/test_alchemy')
})

test('get chain metadata sync infura rpc', async () => {
    const meta = await getChainMetadataSync('1', {INFURA_API_KEY: 'test_infura'})
    expect(meta?.chain.rpc[0]).to.eq('https://mainnet.infura.io/v3/test_infura')
})

test('get chain metadata sync alchemy rpc', async () => {
    const meta = await getChainMetadataSync('42161', {ALCHEMY_API_KEY: 'test_alchemy'})
    expect(meta?.chain.rpc[0]).to.eq('https://arb-mainnet.g.alchemy.com/v2/test_alchemy')
})
