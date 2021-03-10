import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

export default observer(function RegisterForm() {
    const {userStore} = useStore();  

    return (
        <Formik
            initialValues={{displayName: '', username: '', email: '', password: '', confirmPassword: '', error: null}}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => 
                setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
                confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
            })}
            
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivites' color='teal' textAlign='center' />
                    <Label content='Display name' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <Label content='Username' />
                    <MyTextInput name='username' placeholder='Username' />
                    <Label content='Email' />
                    <MyTextInput name='email' placeholder='Email' />
                    <Label content='Password' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <Label content='Confirm Password' />
                    <MyTextInput name='confirmPassword' placeholder='Confirm Password' type='password' />
                    <ErrorMessage 
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error}/> }
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})