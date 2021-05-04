import request from '@/utils/request';
import { stringify } from 'qs';

// const urlPrefix = 'https://service.dameiweb.com/XPAGE';

const urlPrefix = '';
export async function reserve(params) {
  return request('/rental/api/reserve', {
    method: 'POST',
    body: params,
  });
}

export async function getCarModelList(params) {
  return request(`${urlPrefix}/rental/api/car-models?${stringify(params)}`);
}

export async function getCarModel(params) {
  return request(`${urlPrefix}/rental/api/car-models/?${stringify(params)}`);
}
