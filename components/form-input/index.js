import { Form, Input } from 'antd';
const FormInput = ({ label, type, identity, required = false, message = "" }) => {
    function toLowerCase(event) {
        event.target.value = event.target.value.toLowerCase();
    }
    return (
        <Form.Item
            label={label}
            name={identity}
            className="form-input"
            rules={[{ required: required, message: message }]}
        >
            {
                label === "Password" && <Input.Password id={`form_${identity}`} />
            }
            {
                label === "Full Name" && <Input id={`form_${identity}`} />
            }
            {
                label === "Username" && <Input id={`form_${identity}`} onInput={toLowerCase} />
            }
        </Form.Item>
    )
}

export default FormInput;