export function cleanUrl(url: string) {
  const cleanedUrl =
    url[-1] === "/" ? url?.slice(0, url.length - 1) : !url ? "" : url;
  return cleanedUrl;
}

export function cleanEndpoint(endpoint: string) {
  const cleanedEndpoint =
    endpoint.toString()[0] !== "/" ? "/" + endpoint : endpoint;
  return cleanedEndpoint;
}

export function prepareUrl(url: string, endpoint: string) {
  return cleanUrl(url) + cleanEndpoint(endpoint);
}
