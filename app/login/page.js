'use client';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Col, Row, Form, Image, notification } from 'antd';
import { LoginStyled } from './page.styled';
import FormInput from '@/components/form-input';
import StandardButton from '@/components/button';
import LOGO from '@/public/image/logo-saung-laundry.png';

const LoginPage = () => {
  const router = useRouter();
  const [verifiedUser, setVerifiedUser] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const openNotification = (message) => {
    api.info({
      message: `Alert`,
      description: message,
      placement: "top",
    });
  };
  
  const onFinish = values => {
    const validateUser = verifiedUser.find((val) => val.username === values.username && val.password === values.password);
    if(validateUser) {
      localStorage.setItem("user-idle", JSON.stringify(validateUser));
      router.replace("/landing-page")
    } else {
      openNotification('Username or password incorrect, Please try again!');
    }
  };
  const onFinishFailed = errorInfo => {
    const errorMessage = errorInfo.errorFields.map(error => error.errors).join(', ');
    openNotification(errorMessage);
  };
  useEffect(() => {
    const hasListUser = localStorage.getItem("user-data");
    if(!hasListUser) {
      let userData = [];
      const userAdmin = {
        fullname: "Admin",
        username: "admin",
        password: "password"
      };
      const userSample = {
        fullname: "Jimmy Hendrik",
        username: "jimmy",
        password: "password"
      };
      const newUserData = [...userData, userAdmin, userSample];
      setVerifiedUser(newUserData);
      localStorage.setItem("user-data", JSON.stringify(newUserData))
    } else {
      setVerifiedUser(JSON.parse(hasListUser));
    }
  }, [])
  return (
    <LoginStyled>
    {contextHolder}
    <Row>
      <Col span={22} offset={1}>
        <Image src={LOGO.src} width={350} preview={false} />
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
            required
            message="Please input your username!"
          />
          <FormInput 
            label="Password"
            identity="password"
            type="password"
            required
            message="Please input your password!"
          />
          <br />
          <StandardButton
            type="primary"
            htmlType="submit"
            block
            label="Login"
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

export default LoginPage
