import { ChainMap, ChainMetadata, ChainMetadataParams } from "./common.d";

import chains from "./chains.json";
import { fetchChainMetadata } from "./utils";
import { processChainMetadata } from "./utils/processChainMetadata";
const commonChains = chains as ChainMap;

function processMetadata(metadata: ChainMetadata, params?: ChainMetadataParams){
  // deep clone so we don't modify the chain's rpc for subsequent calls
  const metadataCopy = JSON.parse(JSON.stringify(metadata));
  processChainMetadata(metadataCopy, params)
  return metadataCopy
}

export async function getChainMetadata(
  chainId: string,
  params?: ChainMetadataParams
): Promise<ChainMetadata> {
  if (Object.hasOwn(commonChains, chainId)) {
    return processMetadata(commonChains[chainId], params)
  } 
  let metadata = await fetchChainMetadata(chainId);
  return processMetadata(metadata, params)
}

export function getChainMetadataSync(chainId: string, params?: ChainMetadataParams): ChainMetadata | undefined{
  return processMetadata(commonChains[chainId], params)
}

export const chainMap = commonChains
