export function validateUri(str: string) {
  let url;

  try {
    url = new URL(str);
  } catch (_) {
    return undefined;
  }

  if (url.protocol === "http:" || url.protocol === "https:") {
    return url.toString();
  }

  if (url.protocol === "ar:") {
    const path = url.href.replace(/(^\w+:|^)\/\//, "");
    const json = path.endsWith(".json");

    return `https://gateway.irys.xyz/${path}${json ? "" : ".json"}`;
  }

  if (url.protocol === "ipfs:") {
    const path = url.href.replace(/(^\w+:|^)\/\//, "");
    const json = path.endsWith(".json");

    return `https://ipfs.cf-ipfs.com/${path}${json ? "" : ".json"}`;
  }

  return undefined;
}
