'use client';
import { Col, Row, Button, Typography, Form, Input } from 'antd';
import { DashboardStyled } from './page.styled';

export default function RegisterPage() {
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <DashboardStyled>
      <Row>
        <Col span={22} offset={1}>
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
          >
            <Form.Item
              label="Full Name"
              name="full_name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="user_name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
            >
              <Button type="primary" htmlType="submit" block> 
                Register
              </Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </DashboardStyled>
  );
}
