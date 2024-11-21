import { CollectionEntity, FactoryEntity } from "generated";
import {
  INITIAL_FACTORY,
  OwnershipTransferredContext,
  OwnershipTransferredEventLog,
} from "../constants";
import { getFactoryId } from "../../utils";

export function createOrUpdateFactory(
  event: OwnershipTransferredEventLog,
  context: OwnershipTransferredContext
) {
  const id = getFactoryId(event);
  const factory = context.Factory.get(id);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const currentFactoryEntity: FactoryEntity = factory ?? {
    ...INITIAL_FACTORY,
    id: getFactoryId(event),
    chain: BigInt(event.chainId),
    address: event.srcAddress,
    creator_id: event.params.newOwner,
    createdAt: currentTime,
    createdBlock: currentBlock,
  };

  const nextFactoryEntity: FactoryEntity = {
    ...currentFactoryEntity,
    owner_id: event.params.newOwner,
    updatedAt: currentTime,
    updatedBlock: currentBlock,
  };

  return nextFactoryEntity;
}
