import React from "react";
import { UserLayout } from "../../layouts/userLayout";
import { SigninForm } from './SigninForm';

export const SignInPage: React.FC = (props) => {
    // console.log(props);
    return (
        <UserLayout>
            <SigninForm />
        </UserLayout>
    )
}