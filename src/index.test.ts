import { expect, test } from 'vitest'
import { getChainMetadata } from './index'

test('get chain metadata', async () => {
    const meta = await getChainMetadata('1', {INFURA_API_KEY: 'test_infura'})
    expect(meta.chain.rpc[0]).to.eq('https://mainnet.infura.io/v3/test_infura')
})
