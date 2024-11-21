import { UserEntity } from "generated";
import { zeroAddress } from "viem";

export const INITIAL_USER: UserEntity = {
  id: zeroAddress,
  encounteredAt: BigInt(0),
  updatedAt: BigInt(0),
};
