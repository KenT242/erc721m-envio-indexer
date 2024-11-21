import { updateOwnershipTransferredSummary } from "./actions/updateOwnershipTransferredSummary";
import {
  OwnershipTransferredContext,
  OwnershipTransferredEventLog,
} from "./constants";
import { createOwnershipTransferredEvent } from "./actions/createOwnershipTransferredEvent";
import { createOrUpdateFactory } from "./actions/createOrUpdateFactory";
import { createOrUpdateUser } from "./actions/createOrUpdateUser";

export function ownershipTransferredHandler({
  event,
  context,
}: {
  event: OwnershipTransferredEventLog;
  context: OwnershipTransferredContext;
}) {
  const summary = updateOwnershipTransferredSummary(event, context);

  const ownershipTransferred = createOwnershipTransferredEvent(event);

  const user = createOrUpdateUser(event, context);
  const factory = createOrUpdateFactory(event, context);
  context.User.set(user);
  context.FactoryOwnershipTransferred.set(ownershipTransferred);
  context.FactorySummary.set(summary);
  context.Factory.set(factory);
}
