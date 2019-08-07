import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ name, email, password, termsOfServices, values }) => {
    return(
        <div>
            <h2>This is a Form</h2>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                <Field type="text" name="email" placeholder="Email" />
                <Field type="text" name="password" placeholder="Password" />
                <lable>
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="termsOfServices"
                        checked=""
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
           

        }
    }
})(UserForm)

export default FormikUserForm;
