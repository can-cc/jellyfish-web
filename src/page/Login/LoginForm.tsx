import React, { Component } from 'react';
import { Input } from '../../component/Input';
import * as Yup from 'yup';
import { ErrorMessage, Field, Formik } from 'formik';
import { AppButton } from '../../component/AppButton';
import { FormField } from '../../component/Form/FormField';
import { FormErrorMessage } from '../../component/Form/FormErrorMessage';

const validationSchema = Yup.object({
  username: Yup.string().required('请输入用户名'),
  password: Yup.string().required('请输入密码'),
});

interface FormValues {
  username: string;
  password: string;
}

export class LoginForm extends Component<{
  errorMsg?: string;
  submit: (values: FormValues) => Promise<void>;
}> {
  render() {
    return (
      <Formik<FormValues>
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          this.props.submit(values).catch(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting, isValid, touched, handleReset, handleSubmit }) => (
          <form onReset={handleReset} onSubmit={handleSubmit}>
            <FormField name="用户名">
              <Field type="text" as={Input} name="username" block autoFocus />
              <ErrorMessage name="username" component={FormErrorMessage} />
            </FormField>

            <FormField name="密码">
              <Field type="password" as={Input} name="password" block />
              <ErrorMessage name="password" component={FormErrorMessage} />
            </FormField>

            <div style={{ position: 'relative', paddingTop: 20 }}>
              {this.props.errorMsg && <FormErrorMessage>{this.props.errorMsg}</FormErrorMessage>}
            </div>

            <div
              style={{
                marginTop: 12,
                textAlign: 'left',
              }}
            >
              <AppButton
                type="primary"
                size="lg"
                htmlType="submit"
                disabled={isSubmitting || !isValid}
              >
                登录
              </AppButton>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}
