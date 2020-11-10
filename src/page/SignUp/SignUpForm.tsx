import React, { Component } from 'react';
import axios from 'axios';
import AntForm from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const FormItem = AntForm.Item;

class FormComponent extends Component<any> {
  state = {
    confirmDirty: false,
    captchaId: null,
  };

  componentWillMount() {
    this.refreshCaptcha();
  }

  componentDidMount() {}

  refreshCaptcha = () => {
    axios.post('/api/captcha').then((resp) => {
      this.setState({ captchaId: resp.data.id });
      this.props.form.setFieldsValue({ captchaId: resp.data.id });
    });
  };

  handleSubmit = (e) => {
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

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // 现在无法提交表单
    return (
      <AntForm style={{ textAlign: 'left' }}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(<Input placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码' },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input type="password" placeholder="密码" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: '请输入确认密码' },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input type="password" placeholder="确认密码" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('captcha', {
            rules: [{ required: true, message: '请输入验证码' }],
          })(
            <Row gutter={8}>
              <Col span={12}>
                <Input type="tet" placeholder="验证码" />
              </Col>
              <Col span={12}>
                <img
                  onClick={this.refreshCaptcha}
                  style={{
                    height: '32px',
                    cursor: 'pointer',
                  }}
                  alt="验证码"
                  src={'/api/captcha/' + this.state.captchaId + '.png'}
                />
              </Col>
            </Row>
          )}
        </FormItem>
        <FormItem style={{ display: 'none' }}>
          {getFieldDecorator('captchaId', {
            rules: [{ required: true, message: '请刷新验证码' }],
          })(<Input type="text" disabled placeholder="确认密码" />)}
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

export const SignUpForm = FormComponent;
