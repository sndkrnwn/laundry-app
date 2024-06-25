import { Form, Input } from 'antd';
const FormInput = ({ label, type, identity }) => {
    return (
        <Form.Item
            label={label}
            name={identity}
            className="form-input"
        >
            {
                type === "password" ? <Input.Password id={`form_${identity}`} /> : <Input id={`form_${identity}`}  />
            }
        </Form.Item>
    )
}

export default FormInput;