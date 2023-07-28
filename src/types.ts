import type { KoaApp } from '@yunflyjs/yunfly'

export type AnyOptionConfig = Record<string, any>;

export interface PluginOptions {
  koaApp: KoaApp;
  pluginConfig: ETCDConfig;
}

export interface ETCDConfig {
  enable: boolean;
  url?: string;
  refresh?: boolean;
  timeout?: number;
}

export interface GetOption {
  json?: boolean;
  wait?: boolean;
  [props: string]: any;
}


export interface SetOption {
  json?: boolean;
  [props: string]: any;
}

export interface DelOption {
  dir?: boolean;
  [props: string]: any;
}
