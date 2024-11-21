import { DeployedEventLog } from "./constants";

export const getParentId = (event: DeployedEventLog) => {
  return `${event.chainId}_${event.params.aligned}`;
};

export const getCollectionId = (event: DeployedEventLog) => {
  return `${event.chainId}_${event.params.collection}`;
};
