'use client';
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { Col, Row, Form, Image, notification } from 'antd';
import { RegisterStyled } from './page.styled';
import FormInput from '@/components/form-input';
import StandardButton from '@/components/button';
import LOGO from '@/public/image/logo-saung-laundry.png';

export default function RegisterPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [verifiedUser, setVerifiedUser] = useState([]);
  const openNotification = (message) => {
    api.info({
      message: `Alert`,
      description: message,
      placement: "top",
    });
  };

  const onFinish = values => {
    const validateUser = verifiedUser.find((val) => val.username === values.username);
    if(validateUser) {
      openNotification("Username already exists!")
    } else {
      const userData = verifiedUser;
      const newUser = {
        fullname: values.fullname,
        username: values.username,
        password: values.password
      }
      const storeUser = [...userData, newUser];
      localStorage.setItem("user-data", JSON.stringify(storeUser))
      localStorage.setItem("user-idle", JSON.stringify(newUser))
      router.replace("/landing-page")
    }
  };
  const onFinishFailed = errorInfo => {
    const errorMessage = errorInfo.errorFields.map(error => error.errors).join(', ');
    openNotification(errorMessage);
  };
  useEffect(() => {
    const getVeriviedUser = localStorage.getItem("user-data");
    setVerifiedUser(JSON.parse(getVeriviedUser));
  }, []);
  return (
    <RegisterStyled>
      {contextHolder}
      <Row>
        <Col span={22} offset={1}>
          <Image src={LOGO.src} width={350} preview={false}/>
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
              label="Full Name"
              identity="fullname"
              type="text"
              required
              message="Please input Full Name"
            />
            <FormInput 
              label="Username"
              identity="username"
              type="text"
              required
              message="Please input User Name"
            />
            <FormInput 
              label="Password"
              identity="password"
              type="password"
              required
              message="Please Input Password"
            />
            <br />
            <StandardButton
              type="primary"
              htmlType="submit"
              block
              label="Register"
            />
            <StandardButton
              type="secondary"
              htmlType="button"
              block
              label="Login"
              buttonLink="/login"
            />
          </Form>
        </Col>
      </Row>
    </RegisterStyled>
  );
}
