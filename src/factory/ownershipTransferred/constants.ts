import {
  FactoryContract_OwnershipTransferredEvent_eventArgs,
  FactoryContract_OwnershipTransferredEvent_handlerContext,
  FactoryContract_OwnershipTransferredEvent_loaderContext,
  FactoryEntity,
  eventLog,
} from "generated";
import { zeroAddress } from "viem";

export type OwnershipTransferredEventLog =
  eventLog<FactoryContract_OwnershipTransferredEvent_eventArgs>;

export type OwnershipTransferredLoaderContext =
  FactoryContract_OwnershipTransferredEvent_loaderContext;
export type OwnershipTransferredContext =
  FactoryContract_OwnershipTransferredEvent_handlerContext;

export const INITIAL_FACTORY: FactoryEntity = {
  id: "",
  chain: BigInt(0),
  address: zeroAddress,
  creator_id: zeroAddress,
  owner_id: zeroAddress,
  createdAt: BigInt(0),
  createdBlock: BigInt(0),
  updatedAt: BigInt(0),
  updatedBlock: BigInt(0),
};
