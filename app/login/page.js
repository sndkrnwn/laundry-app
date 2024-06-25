'use client';
import { Col, Row, Form, Image } from 'antd';
import { LoginStyled } from './page.styled';
import FormInput from '@/components/form-input';
import StandardButton from '@/components/button';
import LOGO from '@/public/image/logo-saung-laundry.png';

export default function LoginPage() {
  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <LoginStyled>
      <Row>
        <Col span={22} offset={1}>
          <Image src={LOGO.src} width={350} />
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <FormInput 
              label="Username"
              identity="username"
              type="text"
            />
            <FormInput 
              label="Password"
              identity="password"
              type="password"
            />
            <StandardButton
              type="primary"
              htmlType="submit"
              block
              label="Login"
              buttonLink="landing-page"
            />
            <StandardButton
              type="secondary"
              htmlType="button"
              block
              label="Register"
              buttonLink="/register"
            />
          </Form>
        </Col>
      </Row>
    </LoginStyled>
  );
}
