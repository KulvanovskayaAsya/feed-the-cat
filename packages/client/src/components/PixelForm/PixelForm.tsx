import { FC } from 'react'
import { Form, FormProps } from 'antd'
import { Rule } from 'antd/es/form'
import { PixelButton, PixelInput } from '@/components'
import { validate } from '@/utils/validation'

type FormField = {
  name: string
  label: string
  type?: string
  rules?: Rule[]
}

type PixelFormProps = {
  fields: FormField[]
  buttonText: string
  onFinish?: FormProps<string>['onFinish']
  onFinishFailed?: FormProps<string>['onFinishFailed']
}

const defaultOnFinish: FormProps<string>['onFinish'] = values => {
  console.log('Success:', values)
}

const defaultOnFinishFailed: FormProps<string>['onFinishFailed'] =
  errorInfo => {
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

  const getRules = (field: FormField): Rule[] => {
    const rules: Rule[] = [
      { required: true, message: `${field.label} is required` },
      { validator: (_, value) => validateField(field.name, value) },
    ]

    if (field.type === 'email') {
      rules.push({ type: 'email', message: 'Invalid email format.' })
    }

    if (field.rules) {
      rules.push(...field.rules)
    }

    return rules
  }

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
          rules={getRules(field)}
          validateTrigger="onBlur">
          <PixelInput type={field.type || 'text'} label={field.label} />
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
