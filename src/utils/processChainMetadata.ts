import { ChainMetadata, ChainMetadataParams } from "../common"
import { isAlchemyUrl, isInfuraUrl } from "./domainsAreEqual"

function getUrlProperties(url: URL){
    const isWebsocket = url.protocol.includes('wss')
    const isInfura = isInfuraUrl(url)
    const isAlchemy = isAlchemyUrl(url)
    return [isWebsocket, isInfura, isAlchemy]
}

/*
 * Preference is given to infura
 */
export function processChainMetadata(meta: ChainMetadata, params?: ChainMetadataParams){
    if (params?.INFURA_API_KEY !== undefined){
      const infuraRPCs = meta.chain.rpc.filter(item => {
        const [isWebsocket, isInfura, isAlchemy] = getUrlProperties(new URL(item))
        return !isWebsocket && isInfura
      }).map(item => item.replace('${INFURA_API_KEY}', params.INFURA_API_KEY || ''))

      if (infuraRPCs.length > 0) {
        meta.chain.rpc = infuraRPCs
        return
      }
    }

    if (params?.ALCHEMY_API_KEY !== undefined){
        const alchemyRPCs = meta.chain.rpc.filter(item => {
            const [isWebsocket, isInfura, isAlchemy] = getUrlProperties(new URL(item))
            return !isWebsocket && isAlchemy
        }).map(item => item.replace('${ALCHEMY_API_KEY}', params.ALCHEMY_API_KEY || ''))

        if (alchemyRPCs.length > 0) {
            meta.chain.rpc = alchemyRPCs
            return
        }
    }
    const rpcs = meta.chain.rpc.filter(item => {
        const [isWebsocket, isInfura, isAlchemy] = getUrlProperties(new URL(item))
        return !isWebsocket && !isAlchemy && !isInfura
    })
    meta.chain.rpc = rpcs;
}
