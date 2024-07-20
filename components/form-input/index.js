import { Form, Input } from 'antd';
const FormInput = ({ label, type, identity, required = false, message = "" }) => {
    return (
        <Form.Item
            label={label}
            name={identity}
            className="form-input"
            rules={[{ required: required, message: message }]}
        >
            {
                type === "password" ? <Input.Password id={`form_${identity}`} /> : <Input id={`form_${identity}`}  />
            }
        </Form.Item>
    )
}

export default FormInput;