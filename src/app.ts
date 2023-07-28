import type { PluginOptions } from './types';
import ETCD from './core/api';

export let etcd: any;

export default async function yunflyPlugin({
  pluginConfig,
}: PluginOptions): Promise<any> {
  if (!pluginConfig?.enable) {
    return;
  }
  etcd = new ETCD(pluginConfig);
  return await etcd.getAll();
}

export { ETCDConfig } from './types'