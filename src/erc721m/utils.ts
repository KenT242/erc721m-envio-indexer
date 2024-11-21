import { UserEntity, eventLog } from "generated";

export const getCollectionId = (event: eventLog<any>) => {
  return `${event.chainId}_${event.srcAddress}`;
};

export const INITIAL_USER: UserEntity = {
  id: "",
  encounteredAt: 0n,
  updatedAt: 0n,
};
