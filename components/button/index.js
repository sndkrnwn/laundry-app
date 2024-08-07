import Link from 'next/link';
import {  Button, Form } from 'antd';

const StandardButton = ({ label, type = "primary", htmlType = "button", block, buttonLink = "", disabled = false }) => {
    return (
        <Form.Item
            className="standard-button"
        >
            {
                buttonLink.length > 0 ?
                <Link href={buttonLink}>
                    <Button type={type} htmlType={htmlType} block={block} disabled={disabled}> 
                        {label}
                    </Button>
                </Link>
                :
                <Button type={type} htmlType={htmlType} block={block}> 
                    {label}
                </Button>
            }
        
        </Form.Item>
    )
}

export default StandardButton