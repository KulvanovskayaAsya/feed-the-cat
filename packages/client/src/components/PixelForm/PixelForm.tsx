import React, { FC } from 'react'
import { Form, FormProps } from 'antd'
import { PixelButton, PixelInput } from '@/components'
import theme from '@/styles/theme'
import { validate } from '@/utils/validation'

type FormField = {
  name: string
  label: string
  type?: string
  rules?: any[]
}

type PixelFormProps = {
  fields: FormField[]
  buttonText: string
  onFinish?: (values: any) => void
  onFinishFailed?: (errorInfo: any) => void
}

const defaultOnFinish: FormProps<any>['onFinish'] = values => {
  console.log('Success:', values)
}

const defaultOnFinishFailed: FormProps<any>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

const validateField = (fieldName: string, value: string) => {
  const errorMessage = validate(fieldName, value)
  if (errorMessage) {
    return Promise.reject(new Error(errorMessage))
  }
  return Promise.resolve()
}

export const PixelForm: FC<PixelFormProps> = ({
  fields,
  buttonText,
  onFinish,
  onFinishFailed,
}) => {
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      onFinish={onFinish || defaultOnFinish}
      onFinishFailed={onFinishFailed || defaultOnFinishFailed}
      size="large"
      layout="vertical"
      style={{ width: 500 }}>
      {fields.map(field => (
        <Form.Item
          key={field.name}
          name={field.name}
          rules={[
            { required: true, message: `${field.label} is required` },
            { validator: (_, value) => validateField(field.name, value) },
            ...(field.rules || []),
          ]}
          validateTrigger="onBlur">
          <PixelInput
            type={field.type || 'text'}
            label={field.label}
            colors={theme.color}
          />
        </Form.Item>
      ))}
      <Form.Item>
        <PixelButton type="primary" htmlType="submit">
          {buttonText}
        </PixelButton>
      </Form.Item>
    </Form>
  )
}
