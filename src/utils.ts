import axios from "axios";
import { ChainMap, EthListChainIcon, EthListChainMetadata } from "./common";
import { viemChainsMap } from "./viem";

let chainsCache: ChainMap = {};
const fullUrl = "https://chainid.network/chains.json";
const miniUrl = "https://chainid.network/chains_mini.json";
const getSingleChainFetchUrl = (chainId: string) =>
  `https://raw.githubusercontent.com/ethereum-lists/chains/master/_data/chains/eip155-${chainId}.json`;
const getIconFetchUrl = (iconName: string) =>
  `https://raw.githubusercontent.com/ethereum-lists/chains/master/_data/icons/${iconName}.json`;

const fetchIcon = async (icon: string) => {
  const iconResp = await axios.get(getIconFetchUrl(icon));
  return iconResp.data as EthListChainIcon[];
};

export const fetchChainMetadata = async (chainId: string) => {
  if (Object.hasOwn(chainsCache, chainId)) return chainsCache[chainId];

  //fetch chain
  const resp = await axios.get(getSingleChainFetchUrl(chainId));
  if (
    resp === undefined ||
    resp.data === undefined ||
    resp.data.chainId === undefined
  )
    throw new Error(
      "Response data malformed when fetching chain " +
        JSON.stringify(resp, null, 4)
    );
  if (resp.data.chainId !== chainId)
    throw new Error("Chain id fetched does not match chain id requested");
  chainsCache[resp.data.chainId] = { chain: resp.data as EthListChainMetadata };

  //fetch icon
  if (resp.data.icon) {
    const iconData = await fetchIcon(resp.data.icon);
    chainsCache[chainId].icon = iconData;
  }
  return chainsCache[resp.data.chainId];
};

export const fetchAllChainMetadataMap = async () => {
  const resp = await axios.get(fullUrl);
  if (
    resp === undefined ||
    resp.data === undefined ||
    !Array.isArray(resp.data)
  )
    throw new Error(
      "Response data malformed when fetching chains " +
        JSON.stringify(resp, null, 4)
    );

  const allMetadata: ChainMap = {};
  for (const metadata_i of resp.data as EthListChainMetadata[]) {
    console.log("chain ", metadata_i.chainId);
    const viemChain = viemChainsMap[metadata_i.chainId];

    if (viemChain) {
      metadata_i.rpc = [...viemChain.rpcUrls.default.http, ...metadata_i.rpc]
    }

    allMetadata[metadata_i.chainId] = { chain: metadata_i };
    if (metadata_i.icon) {
      const iconData = await fetchIcon(metadata_i.icon);
      allMetadata[metadata_i.chainId].icon = iconData;
    }
  }
  return allMetadata;
};
