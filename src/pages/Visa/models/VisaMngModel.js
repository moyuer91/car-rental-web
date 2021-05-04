import { getProjectList, getMngInitInfo, addProject } from '@/services/visa/VisaMngService';
import { getCheckedData, isSuccessful } from '@/utils/VisaUtils';
import { message } from 'antd/lib/index';

export default {
  namespace: 'visaList',

  state: {
    visaList: [],
    pagination: {},
    initInfo: {},
  },

  effects: {
    *init({ payload }, { call, put }) {
      const initData = yield call(getMngInitInfo, payload);
      const initInfo = getCheckedData(initData);
      yield put({
        type: 'initPage',
        payload: {
          initInfo,
        },
      });
    },

    *fetch({ payload }, { call, put }) {
      const visaInfo = yield call(getProjectList, payload);
      const visaList = getCheckedData(visaInfo);
      for (let i = 0; i < visaList.length; i += 1) {
        const visa = visaList[i];
        visa.key = visa.id;
      }
      yield put({
        type: 'queryList',
        payload: {
          visaList,
          pagination: {
            pageSize: visaInfo.pageSize,
            total: visaInfo.total,
          },
        },
      });
    },

    *add({ payload }, { call, put }) {
      const response = yield call(addProject, payload);
      if (isSuccessful(response)) {
        message.success('新增签证申请成功');
      } else {
        message.error(`新增签证申请失败:${response.msg}`);
      }
      yield put({
        type: 'fetch',
        payload: {},
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    initPage(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
