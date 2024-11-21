import { ContractMetadataEntity, UserEntity, eventLog } from "generated";
import { zeroAddress } from "viem";

export const getFactoryId = (event: eventLog<any>) => {
  return `${event.chainId}_${event.srcAddress}`;
};
