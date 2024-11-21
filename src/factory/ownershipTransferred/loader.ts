import { getFactoryId } from "../utils";
import {
  OwnershipTransferredEventLog,
  OwnershipTransferredLoaderContext,
} from "./constants";

export function ownershipTransferredLoader({
  event,
  context,
}: {
  event: OwnershipTransferredEventLog;
  context: OwnershipTransferredLoaderContext;
}) {
  const id = getFactoryId(event);
  context.FactorySummary.load(id);
  context.User.load(event.params.newOwner);
  context.Factory.load(event.srcAddress, {});
}
