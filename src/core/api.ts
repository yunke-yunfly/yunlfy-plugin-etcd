import type { DelOption, ETCDConfig, GetOption, SetOption } from "../types";

const etcdjs = require('@npmcorp/etcdjs');

export default class ETCD {
  url: string | string[];
  etcd: any;
  store: any;
  allEtcdConfig: any;

  constructor(option: ETCDConfig) {
    const url = option?.url || process.env.ETCDV3_SERVER_URLS;
    if (!url) {
      throw Error('etcd server urls is undefined!');
    }
    this.url = url.split(',');
    this.store = this.etcd = etcdjs(this.url, option);
  }
  async getAllConfig() {
    if (this.allEtcdConfig) {
      return this.allEtcdConfig;
    }
    return await this.getAll();
  }
  getAll() {
    return new Promise((resolve: Function, reject: Function) => {
      this.etcd.get('', { json: false }, (err: any, result: any) => {
        if (err) {
          reject(err);
          return;
        }
        this.allEtcdConfig = result.node.nodes
        resolve(this.allEtcdConfig);
      })
    })
  }
  // etcd.get(key, [opts], cb)
  get(key: string, opts?: GetOption) {
    return new Promise((resolve: Function, reject: Function) => {
      this.etcd.get(key, opts, function (err: any, result: any) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.node.value);
      })
    })
  }
  // etcd.set(key, value, [opts], [cb])
  set(key: string, value: any, opts?: SetOption) {
    return new Promise((resolve: Function, reject: Function) => {
      this.etcd.set(key, value, opts, function (err: any, result: any) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    })
  }
  // etcd.update(key, value, [opts], [cb])
  update(key: string, value: any,) {
    return new Promise((resolve: Function, reject: Function) => {
      this.etcd.update(key, value, function (err: any, result: any) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    })
  }
  // etcd.del(key, [opts], [cb])
  del(key: string, opts?: DelOption) {
    return new Promise((resolve: Function, reject: Function) => {
      this.etcd.del(key, opts, function (err: any, result: any) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    })
  }
  // etcd.mkdir(key, [opts], [cb])
  mkdir(key: string) {
    return new Promise((resolve: Function, reject: Function) => {
      this.etcd.mkdir(key, function (err: any, result: any) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    })
  }
  // etcd.rmdir(key, [opts], [cb])
  rmdir(key: string) {
    return new Promise((resolve: Function, reject: Function) => {
      this.etcd.rmdir(key, function (err: any, result: any) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    })
  }
  // store.wait(key, [opts], [cb])
  wait(key: string, cb: Function) {
    return this.etcd.wait(key, cb);
  }
}
