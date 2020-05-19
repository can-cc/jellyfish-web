import React from 'react';
import { AppModal } from '../../../component/Modal';
import { FormField } from '../../../component/Form/FormField';
import { ErrorMessage, Field, Formik } from 'formik';
import { Input } from '../../../component/Input';
import { FormErrorMessage } from '../../../component/Form/FormErrorMessage';
import { AppButton } from '../../../component/AppButton';
import * as Yup from 'yup';
import { AppAction } from '../../../action';

const validationSchema = Yup.object({
  name: Yup.string().required('请输入清单名称')
});

interface FormValues {
  name: string;
}

export interface CreateBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateBoxModal(props: CreateBoxModalProps) {
  const createBox = (name: string) => {
    return AppAction.createBox({
      name
    });
  };
  return (
    <AppModal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={{
        content: {
          background: '#fff',
          width: 300,
          height: 160,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -100%)',
          padding: '20px'
        }
      }}
    >
      <Formik<FormValues>
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          createBox(values.name).then(() => {
            setSubmitting(false);
            props.onClose();
          });
        }}
      >
        {({ isSubmitting, isValid, touched, handleReset, handleSubmit }) => (
          <form onReset={handleReset} onSubmit={handleSubmit}>
            <FormField name="清单名称">
              <Field type="text" as={Input} name="name" block autoFocus />
              <ErrorMessage name="name" component={FormErrorMessage} />
            </FormField>

            <div
              style={{
                textAlign: 'left'
              }}
            >
              <AppButton type="primary" htmlType="submit" disabled={isSubmitting || !isValid}>
                确定
              </AppButton>
            </div>
          </form>
        )}
      </Formik>
    </AppModal>
  );
}
