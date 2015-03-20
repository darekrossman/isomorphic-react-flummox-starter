import request from './request';

var WebAPIUtils = {

  apiRoot: '://127.0.0.1',

  async send(path, entity, idField) { 
    let id = typeof idField === 'string' ? entity[idField] : entity.id;
    entity = entity.toJS();
    let url = this.apiRoot + path;
    let method = 'post';
    if (entity.id) {
      url += `/${id}`;
      method = 'put';
    }
    return request[method](url).send(entity).exec(); 
  },

  async get(path, params = {}, query = {}) {
    let url = this.apiRoot + path + (params.id ? `/${params.id}`:'');
    let req = request.get(url).query(query).exec();
    return req;
  },

  async remove(path, params = {}) {
    let url = this.apiRoot + path + (params.id ? `/${params.id}`:'');
    let req = request.del(url).exec();
    return req;
  }, 

  // configuration
  use(config) {
    if (config.apiRoot) 
      this.apiRoot = config.apiRoot;
  }

};

export default WebAPIUtils;