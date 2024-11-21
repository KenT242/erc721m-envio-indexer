import { CollectionDeployedEntity } from "generated";
import { getFactoryId } from "../../utils";
import { DeployedEventLog } from "../constants";

export function createDeployedEvent(event: DeployedEventLog) {
  const id = getFactoryId(event);

  const DeployedEntity: CollectionDeployedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    chain: BigInt(event.chainId),
    deployer: event.params.deployer,
    collection: event.params.collection,
    aligned: event.params.aligned,
    salt: event.params.salt,
    eventsSummary: id,
    factory_id: event.srcAddress,
    createdAt: BigInt(event.blockTimestamp),
    createdBlock: BigInt(event.blockNumber),
  };

  return DeployedEntity;
}
