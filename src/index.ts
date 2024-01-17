import { ChainMap, ChainMetadata, ChainMetadataParams } from "./common.d";

import chains from "./chains.json";
import { fetchChainMetadata } from "./utils";
import { processChainMetadata } from "./utils/processChainMetadata";
const commonChains = chains as ChainMap;

export async function getChainMetadata(
  chainId: string,
  params?: ChainMetadataParams
): Promise<ChainMetadata> {
  if (Object.hasOwn(commonChains, chainId)) return commonChains[chainId];
  let metadata = await fetchChainMetadata(chainId);
  // deep clone so we don't modify the chain's rpc for subsequent calls
  metadata = JSON.parse(JSON.stringify(metadata))
  if (params !== undefined){
    processChainMetadata(metadata, params)
  }
  return metadata;
}

export function getChainMetadataSync(chainId: string): ChainMetadata | undefined{
  return commonChains[chainId]
}

export const chainMap = commonChains
