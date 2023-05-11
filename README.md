# chains
chains is a lightweight (~600 kb) package that supports constant time lookup of chain metadata given a chainId. chains works offline with a chain map of around 1000 chains, and if a chain is not found, [ethereum-lists/chains](https://github.com/ethereum-lists/chains) will be queried.

Most existing implementations of chain metadata lookup require the dev to copy paste a large json array of chain into their application which the dev then does linear time lookups or parses into a map at runtime. This has poor performance and maintainability. When chains are added, the dev has to replace the json array. Updating an npm package is much easier.

The other solution is to query external api's. These api's may fail occasionally though, and this does not support offline use either which is an important requirement for some applications.

chains solves these issues.
 
## Getting started

`yarn add @hyperplay/chains`

```
import { getChainMetadata } from '@hyperplay/chains'
const chainId = '1'
const metadata = await getChainMetadata(chainId)
console.log(JSON.stringify(metadata, null, 4))
```

## Getting your chain listed
Please submit a PR to https://github.com/ethereum-lists/chains with the appropriate data added to the `_data` folder. After this is merged, @hyperplay/chains will automatically start working with your chain. 

## Developers
### Updating the chain map
Run `yarn generateChainMap` in the root directory and then submit a PR with the updated map.
