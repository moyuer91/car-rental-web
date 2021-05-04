import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List, Input,Button,Icon } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';

import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './CarModelList.less';

const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */

@connect(({ rental, loading }) => ({
  rental,
  loading: loading.models.rental,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'rental/fetchList',
      payload: {},
    });
  },
})
class CardModelList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rental/fetchList',
      payload: {},
    });
  }

  render() {
    const {
      rental: { carModelList:list },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const cardList = list ? (
        <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={list}
            renderItem={item =>
                <List.Item key={item.id}>
                    <Card hoverable className={styles.card} actions={[<a>查看详情</a>]}>
                        <Card.Meta
                            avatar={<img alt="" className={styles.cardAvatar} src={item.pictureUrl} />}
                            title={<a>{item.name+"      "+item.price+"元"}</a>}
                            description={
                                <Ellipsis className={styles.item} lines={3}>
                                    {item.detail}
                                </Ellipsis>
                            }
                        />
                    </Card>
                </List.Item>
            }
        />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const actionsTextMap = {
      expandText: <FormattedMessage id="component.tagSelect.expand" defaultMessage="Expand" />,
      collapseText: (
        <FormattedMessage id="component.tagSelect.collapse" defaultMessage="Collapse" />
      ),
      selectAllText: <FormattedMessage id="component.tagSelect.all" defaultMessage="All" />,
    };

    return (
      <div className={styles.coverCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable actionsText={actionsTextMap}>
                    <TagSelect.Option value="cat1">紧凑5座</TagSelect.Option>
                    <TagSelect.Option value="cat2">舒适5座</TagSelect.Option>
                    <TagSelect.Option value="cat3">豪华5座</TagSelect.Option>
                    <TagSelect.Option value="cat4">越野车</TagSelect.Option>
                    <TagSelect.Option value="cat5">商务7座</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="其它选项" grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="车型名称">
                    {getFieldDecorator('modelName', {})(
                      <Input placeholder={"请输入"} />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <div className={styles.cardList}>{cardList}</div>
      </div>
    );
  }
}

export default CardModelList;
