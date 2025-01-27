import React, { useState } from "react";
import { Input, Button, Form, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../services/AuthService";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Replace this URL with your actual login endpoint
      const response = await login(values.email, values.password);

      console.log("Admin Login: ", response);
    } catch (error) {
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Please enter your details.
          </p>
        </div>

        <Form
          name="admin_login"
          className="space-y-4"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Email"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="rounded-md"
            />
          </Form.Item>

          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center text-gray-600">
          Need help?{" "}
          <a href="/contact" className="text-blue-600 hover:text-blue-800">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
