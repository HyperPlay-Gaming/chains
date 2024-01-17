interface Feature {
  name: string;
}
interface Explorer {
  name: string;
  url: string;
  standard: string;
  icon?: string;
}

interface Bridge {
  url: string;
}

interface Parent {
  type: string;
  chain: string;
  bridges?: Bridge[]
}

export interface EthListChainMetadata {
  name: string;
  chain: string;
  icon?: string;
  rpc: string[];
  features?: Feature[];
  faucets: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  ens?: {
    registry: string;
  };
  explorers?: Explorer[];
  parent?: Parent;
}

export interface EthListChainIcon {
  url: string;
  width: number;
  height: number;
  format: png;
}

interface ChainMetadata {
  chain: EthListChainMetadata;
  icon?: EthListChainIcon[];
}

export interface ChainMap {
  [key: string]: ChainMetadata;
}

export interface ChainMetadataParams {
  INFURA_API_KEY?: string,
  ALCHEMY_API_KEY?: string
}