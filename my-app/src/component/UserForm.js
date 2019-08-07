import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ touched, errors, values, handleSubmit }) => {
    return(
        <div>
            <h2>This is a Form</h2>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="Email" />
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                <Field type="text" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
                <lable>
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="termsOfServices"
                        checked={values.termsOfServices}
                    />
                </lable>
            </Form>
            <button type="submit">Submit</button>
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfServices, values }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            termsOfServices: termsOfServices || '',
           

        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        termsOfServices: Yup.string().required()
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post(`https://reqres.in/api/users/`, values)
            .then(res => {
                setStatus(res.data)
            })
            .catch(err => console.log(err.response))
    }

})(UserForm)

export default FormikUserForm;
