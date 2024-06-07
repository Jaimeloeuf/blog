type Config = {
  /**
   * This should be a full URL with the https:// scheme. Do not include the
   * ending trailing slash!
   */
  baseUrl: string;
};

let _config: Config = {
  baseUrl: "",
};

export function setConfig(config: Config) {
  _config = config;
}

export function getConfig() {
  return _config;
}
