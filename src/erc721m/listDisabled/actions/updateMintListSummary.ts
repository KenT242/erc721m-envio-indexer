import { nftListDisabledContext, nftListDisabledEventLog } from "../constants";
import { getCollectionId } from "../../utils";
import { NftSummaryEntity } from "generated";
import { INITIAL_NFT_SUMMARY } from "../../constants";

export function updateMintListSummary(
  event: nftListDisabledEventLog,
  context: nftListDisabledContext
) {
  const id = getCollectionId(event);

  const summary = context.NftSummary.get(id);

  const currentSummaryEntity: NftSummaryEntity = summary ?? {
    ...INITIAL_NFT_SUMMARY,
    id,
    chain: BigInt(event.chainId),
  };

  const nextSummaryEntity: NftSummaryEntity = {
    ...currentSummaryEntity,
    customMintDisabledCount: currentSummaryEntity.customMintDisabledCount + 1n,
    updatedAt: BigInt(event.blockTimestamp),
    updatedBlock: BigInt(event.blockNumber),
  };

  return nextSummaryEntity;
}
