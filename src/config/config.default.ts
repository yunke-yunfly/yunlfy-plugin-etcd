import type { Config } from '@yunflyjs/yunfly';

/**
 * @export
 * @param {KoaApp} app
 * @returns
 */
export default function config(): Config {
  const config: Config = {};

  config.etcd = {
    enable: false,
  };

  return config;
}
