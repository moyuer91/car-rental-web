import React, { Fragment, PureComponent } from 'react';
import { Button, Row, Col, Steps, Card } from 'antd';
import Result from '@/components/Result';
import * as moment from 'moment';
import router from 'umi/router';

const { Step } = Steps;

class Success extends PureComponent {
  onBackToMain = () => {
    const {
      location: { query },
    } = this.props;
    const { backurl } = query;
    if (backurl) {
      window.location.href = backurl;
      // window.location.href='https://visa.dameiweb.com/#/myVisa?token=AUTH__APP_1063_967c7e60-466a-4f4e-9f21-556755c2cb5e';
    } else {
      window.opener = null; // 禁止某些浏览器的一些弹窗
      window.open('', '_self');
      window.close();
    }
  };

  viewDetail = () => {
    const {
      location: { query },
    } = this.props;
    router.push(`/visa/applform/${query.id}/preview`);
  };

  render() {
    const {
      location: { query },
    } = this.props;
    const { applicant } = query;
    const desc1 = (
      <div
        style={{
          fontSize: 12,
          color: 'rgba(0, 0, 0, 0.45)',
          position: 'relative',
          left: 42,
          textAlign: 'left',
        }}
      >
        <div style={{ margin: '8px 0 4px' }}>{applicant}</div>
        <div>{moment().format('YYYY-MM-DD')}</div>
        <div>{moment().format('HH:mm:ss')}</div>
      </div>
    );

    const extra = (
      <Fragment>
        <Row style={{ marginBottom: 16 }}>
          <Col xs={24}>
            <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>申请单号：{query.id}</span>
            <span style={{ marginLeft: 20, color: 'rgba(0, 0, 0, 0.85)' }}>
              申请人：{applicant}
            </span>
          </Col>
        </Row>
        <Steps
          direction="vertical"
          style={{ marginLeft: 42, width: 'calc(100% + 84px)' }}
          progressDot
          current={1}
        >
          <Step title={<span style={{ fontSize: 14 }}>创建申请单</span>} description={desc1} />
          <Step title={<span style={{ fontSize: 14 }}>定制师审核</span>} />
          <Step title={<span style={{ fontSize: 14 }}>提交签证中心</span>} />
          <Step title={<span style={{ fontSize: 14 }}>完成</span>} />
        </Steps>
        <Row style={{ marginBottom: 16 }}>
          <Col xs={24}>
            <span style={{ fontSize: 16, color: 'rgba(255, 0, 0, 1)' }}>
              请把您的申请单号，发给您的定制师
            </span>
          </Col>
        </Row>
      </Fragment>
    );

    const actions = (
      <Fragment>
        <Button onClick={this.onBackToMain}>关闭</Button>
        <Button type="primary" onClick={this.viewDetail}>
          查看详情
        </Button>
      </Fragment>
    );
    return (
      <Card bordered={false} style={{ height: window.screen.height }}>
        <Result
          type="success"
          title="提交成功"
          extra={extra}
          actions={actions}
          style={{ marginTop: 48, marginBottom: 16 }}
        />
      </Card>
    );
  }
}
export default Success;
