import { Form, Input, Button, Checkbox } from "antd";
import styles from './SigninForm.module.css';
import { signin } from "../../redux/user/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const SigninForm = () => {

    const loading = useSelector(s => s.user.loading);
    const jwt = useSelector(s => s.user.tooken);
    const error = useSelector(s => s.user.error);
    const flag = useSelector(s => s.user.flag);

    const dispatch = useDispatch();
    const history = useHistory();

    // useEffect(() => {
    //     if (jwt !== null) {
    //         history.push('/');
    //     }
    // }, [jwt]);

    useEffect(() => {
        if (flag) {
            history.push('/');
        }
    }, [flag]);

    const onFinish = (values: any) => {
        console.log("Success:", values);
        dispatch(signin({
            username: values.username,
            password: values.password
        }))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles["register-form"]}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
