import { FactorySummaryEntity } from "generated";
import { getFactoryId } from "../../utils";
import { INITIAL_EVENTS_SUMMARY } from "../../constants";
import {
  OwnershipTransferredContext,
  OwnershipTransferredEventLog,
} from "../constants";

export function updateOwnershipTransferredSummary(
  event: OwnershipTransferredEventLog,
  context: OwnershipTransferredContext
) {
  const id = getFactoryId(event);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const summary = context.FactorySummary.get(id);

  const currentSummaryEntity: FactorySummaryEntity = summary ?? {
    ...INITIAL_EVENTS_SUMMARY,
    id,
    chain: BigInt(event.chainId),
  };

  const nextSummaryEntity: FactorySummaryEntity = {
    ...currentSummaryEntity,
    ownershipTransferredCount:
      currentSummaryEntity.ownershipTransferredCount + BigInt(1),
    updatedAt: currentTime,
    updatedBlock: currentBlock,
  };

  return nextSummaryEntity;
}
