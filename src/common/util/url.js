const normalizeUrl = (url) => {
  if (url === undefined || url === null) {
    return undefined;
  }

  url += url.endsWith("/") ? "" : "/";

  return url;
};

export { normalizeUrl };
