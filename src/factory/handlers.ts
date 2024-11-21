import { FactoryContract } from "generated";
import { deployedEventLoader } from "./deployed/loader";
import { deployedHandler } from "./deployed/handler";
import { ownershipTransferredLoader } from "./ownershipTransferred/loader";
import { ownershipTransferredHandler } from "./ownershipTransferred/handler";

FactoryContract.Deployed.loader(({ event, context }) =>
  deployedEventLoader({ event, context })
);

FactoryContract.Deployed.handlerAsync(async ({ event, context }) =>
  deployedHandler({ event, context })
);

FactoryContract.OwnershipTransferred.loader(({ event, context }) =>
  ownershipTransferredLoader({ event, context })
);

FactoryContract.OwnershipTransferred.handler(({ event, context }) =>
  ownershipTransferredHandler({ event, context })
);
