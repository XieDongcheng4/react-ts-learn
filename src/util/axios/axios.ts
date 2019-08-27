import * as qs from 'qs'
import axios from './axios-config'

type MethodType = (typeof MethodTypes)[number]
declare const MethodTypes: ['get', 'post', 'delete', 'put'];
declare type  parms = {
  url: string,
  args?: any,
  method?: MethodType
}
export default class Axios<T> {
  private url: string;
  private args: {};
  private method: MethodType;
  
  constructor({url, args = {}, method = 'get'}: parms) {
    this.url = url;
    this.args = args;
    this.method = method;
  }
  
  public ajax = (): Promise<T> => new Promise<T>((resolve, reject) => {
    let promise;
    let {url} = this;
    const {args, method} = this;
    if (method === 'get') {
      if (args !== {}) {
        url = url + '?' + qs.stringify(args)
      }
      promise = axios.get(url)
    } else {
      promise = axios[`${method}`](url, {data: args})
    }
    promise.then((res: T) => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}
