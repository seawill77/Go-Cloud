import { Form, Icon, Input, Button, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { API_ROOT, TOKEN_KEY } from "../constant.js";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                fetch(`${API_ROOT}/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        }
                        throw new Error(response.statusText);
                    })
                    .then(data => {
                        console.log(data);
                        this.props.handleLogin(data);
                        localStorage.setItem(TOKEN_KEY, data);
                        message.success("Login succeeds");
                        // this.props.history.push("/home"); /
                    })
                    .catch(err => {
                        console.log(err);
                        message.error("Login fails");
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator("username", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your username!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder="Username"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Password!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}

export const Login = Form.create()(NormalLoginForm);