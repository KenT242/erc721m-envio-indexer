import { TokenEntity, TokenMetadataEntity } from "generated";
import { nftTransferContext, nftTransferEventLog } from "../constants";
import { getTokenId } from "../utils";
import { INITIAL_TOKEN } from "../../constants";
import { getCollectionId } from "../../utils";
import { type Address } from "viem";
import { getTokenMetadata } from "../../../getTokenMetadata";
import { createTokenMetadata } from "./createTokenMetadata";

export async function createOrUpdateToken({
  event,
  context,
}: {
  event: nftTransferEventLog;
  context: nftTransferContext;
}): Promise<{ token: TokenEntity; metadata: TokenMetadataEntity | undefined }> {
  const id = getTokenId(event);
  const collection_id = getCollectionId(event);

  const token = await context.Token.get(id);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  let tokenUri: string | undefined;
  let metadata;
  if (!token) {
    const { chainId } = event;
    const address = event.srcAddress as Address;
    const tokenId = event.params.id;
    tokenUri = await getTokenMetadata({
      chainId,
      address,
      tokenId,
      blockNumber: currentBlock,
    });
    if (process.env.SKIP_METADATA !== "true") {
      metadata = await createTokenMetadata({
        id,
        tokenUri,
        blockNumber: currentBlock,
        blockTimestamp: currentTime,
        isMinted: true,
      });
    }
  }

  const currentTokenEntity: TokenEntity = token ?? {
    ...INITIAL_TOKEN,
    id,
    chain: BigInt(event.chainId),
    collection_id,
    token_id: event.params.id,
    metadata_id: id,
    metadataUri: tokenUri,
    minter_id: event.params.to,
    createdAt: currentTime,
    createdBlock: currentBlock,
  };

  const nextTokenEntity: TokenEntity = {
    ...currentTokenEntity,
    owner_id: event.params.to,
    updatedAt: currentTime,
    updatedBlock: currentBlock,
  };

  return { token: nextTokenEntity, metadata };
}
