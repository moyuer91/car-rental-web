import { getCarModelList, getCarModel, reserve } from '@/services/rental/rentalService';
import { getCheckedData, isSuccessful } from '@/utils/VisaUtils';
import { message } from 'antd/lib/index';

export default {
  namespace: 'rental',

  state: {
    carModelList: []
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const carModelInfo = yield call(getCarModelList, payload);
      const carModelList = getCheckedData(carModelInfo);
      for (let i = 0; i < carModelList.length; i += 1) {
        const item = carModelList[i];
          item.key = item.id;
      }
      yield put({
        type: 'queryList',
        payload: {
          carModelList
        },
      });
    },

    *reserve({ payload }, { call, put }) {
      const response = yield call(reserve, payload);
      if (isSuccessful(response)) {
        message.success('预约成功');
      } else {
        message.error(`预约失败:${response.msg}`);
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
