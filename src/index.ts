import { ChainMap, ChainMetadata } from "./common.d";

import chains from "./chains.json";
import { fetchChainMetadata } from "./utils";
const commonChains = chains as ChainMap;

export async function getChainMetadata(
  chainId: string
): Promise<ChainMetadata> {
  if (Object.hasOwn(commonChains, chainId)) return commonChains[chainId];
  const metadata = await fetchChainMetadata(chainId);
  return metadata;
}

export function getChainMetadataSync(chainId: string): ChainMetadata | undefined{
  return commonChains[chainId]
}

export const chainMap = commonChains
