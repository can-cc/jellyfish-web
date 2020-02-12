import React, { Component } from 'react';
import axios from 'axios';
import AntForm from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const FormItem = AntForm.Item;

class FormComponent extends Component {
  state = {
    confirmDirty: false,
    captchaId: null
  };

  componentWillMount() {
    this.refreshCaptcha();
  }

  componentDidMount() {}

  refreshCaptcha = () => {
    axios.post('/api/captcha').then(resp => {
      this.setState({ captchaId: resp.data.id });
      this.props.form.setFieldsValue({ captchaId: resp.data.id });
    });
  };

  handleSubmit = e => {
    this.props.form.validateFields();
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (this.state.confirmDirty && value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不符');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
      <AntForm style={{ textAlign: 'left' }} onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
              placeholder="用户名"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码' },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: '请输入确认密码' },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="确认密码"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('captcha', {
            rules: [{ required: true, message: '请输入验证码' }]
          })(
            <Row gutter={8}>
              <Col span={12}>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="tet"
                  placeholder="验证码"
                />
              </Col>
              <Col span={12}>
                {this.state.captchaId ? (
                  <img
                    onClick={this.refreshCaptcha}
                    style={{
                      height: '32px',
                      cursor: 'pointer'
                    }}
                    alt="验证码"
                    src={'/api/captcha/' + this.state.captchaId + '.png'}
                  />
                ) : (
                  <img
                    style={{ height: '32px', backgroudColor: 'white' }}
                    onClick={this.refreshCaptcha}
                    src=""
                  />
                )}
              </Col>
            </Row>
          )}
        </FormItem>
        <FormItem style={{ display: 'none' }}>
          {getFieldDecorator('captchaId', {
            rules: [{ required: true, message: '请刷新验证码' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              disabled
              placeholder="确认密码"
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </FormItem>
      </AntForm>
    );
  }
}

export const SignUpForm = AntForm.create()(FormComponent);
