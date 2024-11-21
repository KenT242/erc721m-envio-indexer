import { ERC721MContract } from "generated";
import { nftTransferLoader } from "./transfer/loader";
import { nftTransferHandler } from "./transfer/handler";
import { nftListConfiguredLoader } from "./listConfigured/loader";
import { nftListConfiguredHandler } from "./listConfigured/handler";
import { nftListRepricedLoader } from "./listRepriced/loader";
import { nftListRepricedHandler } from "./listRepriced/handler";
import { nftListDisabledLoader } from "./listDisabled/loader";
import { nftListDisabledHandler } from "./listDisabled/handler";
import { nftListReenabledLoader } from "./listReenabled/loader";
import { nftListReenabledHandler } from "./listReenabled/handler";
import { nftListDeletedLoader } from "./listDeleted/loader";
import { nftListDeletedHandler } from "./listDeleted/handler";

ERC721MContract.Transfer.loader(({ event, context }) =>
  nftTransferLoader({ event, context })
);

ERC721MContract.Transfer.handlerAsync(async ({ event, context }) =>
  nftTransferHandler({ event, context })
);

ERC721MContract.CustomMintConfigured.loader(({ event, context }) =>
  nftListConfiguredLoader({ event, context })
);

ERC721MContract.CustomMintConfigured.handler(({ event, context }) =>
  nftListConfiguredHandler({ event, context })
);

ERC721MContract.CustomMintRepriced.loader(({ event, context }) =>
  nftListRepricedLoader({ event, context })
);

ERC721MContract.CustomMintRepriced.handler(({ event, context }) => {
  return nftListRepricedHandler({ event, context });
});

ERC721MContract.CustomMintReenabled.loader(({ event, context }) =>
  nftListDisabledLoader({ event, context })
);

ERC721MContract.CustomMintDisabled.handler(({ event, context }) => {
  return nftListDisabledHandler({ event, context });
});

ERC721MContract.CustomMintReenabled.loader(({ event, context }) =>
  nftListReenabledLoader({ event, context })
);

ERC721MContract.CustomMintReenabled.handler(({ event, context }) => {
  return nftListReenabledHandler({ event, context });
});

ERC721MContract.CustomMintDeleted.loader(({ event, context }) =>
  nftListDeletedLoader({ event, context })
);

ERC721MContract.CustomMintDeleted.handler(({ event, context }) => {
  return nftListDeletedHandler({ event, context });
});
