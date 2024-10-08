import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormField from '../component/FormField';
import { signInSchema, signInfields } from '../constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddLoginMutation } from '../redux/services/libApi';

const SignIn = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(signInSchema)
    });
    const [id, setId] = useState('');

    const [login] = useAddLoginMutation();

    // Clear any existing tokens on component mount
    useEffect(() => {
        localStorage.removeItem('Token');
    }, []);
    
    
    const onSubmit = async (data) => {
        try {
            const result = await login(data);
            if (result.error) {
                toast.error("Email or password is incorrect. Please try again.", { autoClose: 1500 });
                return;
            }
            
            // Get the token and store it
            const token = result?.data?.token;
            localStorage.setItem('Token', token);
            toast.success("Login done Successfully", { autoClose: 500 });
            
            // Decode the token to get user ID
            const tokenParts = token.split('.');
            if (tokenParts.length === 3) {
                const payloadBase64 = tokenParts[1];
                const decodedPayload = atob(payloadBase64);
                const payload = JSON.parse(decodedPayload);
                
                // Set user ID
                setId(payload.user_id);
                console.log('User ID:', payload.user_id);

                // Navigate to the next page with user ID as a parameter
                navigate(`/library/book/${payload.user_id}`);
            } else {
                toast.error("Invalid token format.", { autoClose: 1500 });
            }

            reset();
        } catch (error) {
            if (error.response) {
                toast.error("Server responded with an error. Please try again.", { autoClose: 1500 });
            } else if (error.request) {
                toast.error("Network error. Please check your connection.", { autoClose: 1500 });
            } else {
                toast.error("An error occurred during submission. Please try again.", { autoClose: 1500 });
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-5'>
            <ToastContainer />
            <div className='card border-0 shadow-lg bg-light card mx-auto col-md-8 col-lg-5 col-xl-5'>
                <div className='card-body mt-3 p-xl-4 p-lg-4'>
                    <h3 className='text-center'>Library Management Systems</h3>
                    <div className='mb-5'></div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {signInfields.map((field, index) => (
                            <FormField
                                key={index}
                                field={field}
                                register={register}
                                errors={errors}
                            />
                        ))}
                        <button className="btn btn-secondary col-12 mt-3 rounded-1" type="submit">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;