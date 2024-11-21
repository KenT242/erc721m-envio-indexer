import { nftTransferContext, nftTransferEventLog } from "../constants";
import { getCollectionId } from "../../utils";
import { NftSummaryEntity } from "generated";
import { INITIAL_NFT_SUMMARY } from "../../constants";

export async function updateTransferSummary(
  event: nftTransferEventLog,
  context: nftTransferContext
) {
  const id = getCollectionId(event);

  const summary = await context.NftSummary.get(id);

  const currentSummaryEntity: NftSummaryEntity = summary ?? {
    ...INITIAL_NFT_SUMMARY,
    id,
    chain: BigInt(event.chainId),
  };

  const nextSummaryEntity: NftSummaryEntity = {
    ...currentSummaryEntity,
    transferCount: currentSummaryEntity.transferCount + 1n,
    updatedAt: BigInt(event.blockTimestamp),
    updatedBlock: BigInt(event.blockNumber),
  };

  return nextSummaryEntity;
}
