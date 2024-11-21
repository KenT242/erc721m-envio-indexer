import { ContractMetadataEntity, TokenMetadataEntity } from "generated";
import { validateUri } from "../../../validateUri";
import { INITIAL_TOKEN_METADATA } from "../../constants";

type Attribute = {
  trait_type: string;
  display_type?: string;
  value: string | number;
};

interface TokenMetadataInterface {
  name?: string;
  description?: string;
  image?: string;
  external_link?: string;
  attributes?: Attribute[];
}

export async function createTokenMetadata({
  id,
  tokenUri,
  blockTimestamp,
  blockNumber,
  isMinted,
}: {
  id: string;
  tokenUri?: string;
  blockTimestamp: bigint;
  blockNumber: bigint;
  isMinted?: boolean;
}) {
  let metadata: undefined | TokenMetadataInterface;

  if (tokenUri) {
    const uri = validateUri(tokenUri);
    if (uri) {
      try {
        AbortSignal.timeout ??= function timeout(ms) {
          const ctrl = new AbortController();
          setTimeout(() => ctrl.abort(), ms);
          return ctrl.signal;
        };
        const result = await fetch(uri, { signal: AbortSignal.timeout(2500) });
        metadata = (await result.json()) as TokenMetadataInterface | undefined;
      } catch (e) {
        console.log("[initToken] unable to fetch token uri: ", uri);
      }
    } else {
      try {
        metadata = JSON.parse(tokenUri);
      } catch (e) {}
    }
  }
  let raw;
  try {
    raw = metadata ? JSON.stringify(metadata) : "";
  } catch (_) {}

  const metadataEntity: TokenMetadataEntity = {
    ...INITIAL_TOKEN_METADATA,
    id,
    raw,
    name: metadata?.name,
    description: metadata?.description,
    image: metadata?.image,
    external_link: metadata?.external_link,
    attributes: metadata?.attributes
      ? JSON.stringify(metadata.attributes)
      : "[]",
    createdAt: isMinted ? blockTimestamp : undefined,
    createdBlock: isMinted ? blockNumber : undefined,
    encounteredAt: blockTimestamp,
    encounteredBlock: blockNumber,
    updatedAt: blockTimestamp,
    updatedBlock: blockNumber,
  };

  return metadataEntity;
}
