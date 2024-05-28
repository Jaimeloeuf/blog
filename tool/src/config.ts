let _config = {
  /**
   * This should be a full URL with the https:// scheme. Do not include the
   * ending trailing slash!
   */
  baseUrl: "",
};

export function setConfig(config: typeof _config) {
  _config = config;
}

export function getConfig() {
  return _config;
}
