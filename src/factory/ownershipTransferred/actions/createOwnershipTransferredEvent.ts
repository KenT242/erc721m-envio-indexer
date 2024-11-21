import { FactoryOwnershipTransferredEntity } from "generated";
import { getFactoryId } from "../../utils";
import { OwnershipTransferredEventLog } from "../constants";

export function createOwnershipTransferredEvent(
  event: OwnershipTransferredEventLog
) {
  const id = getFactoryId(event);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const { oldOwner, newOwner } = event.params;

  const FactoryOwnershipTransferredEntity: FactoryOwnershipTransferredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    chain: BigInt(event.chainId),
    oldOwner,
    newOwner,
    factory_id: event.srcAddress,
    eventsSummary: id,
    createdAt: currentTime,
    createdBlock: currentBlock,
  };

  return FactoryOwnershipTransferredEntity;
}
