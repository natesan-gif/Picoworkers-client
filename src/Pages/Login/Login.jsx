import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import login from '../../assets/login.json';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../Hooks/useAuth.jsx';
import SocialLogin from './SocialLogin';
import Lottie from 'lottie-react';
import axios from 'axios';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner.jsx';
import useAxiosPublic from '../../Hooks/useAxiosPublic.jsx';
import useAxiosSecure from '../../Hooks/useAxiosSecure.jsx';

const Login = () => {
    const { signInUser, user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || '/';
    const axiosPublic = useAxiosPublic();
const axiosSecure=useAxiosSecure()
    useEffect(() => {
        if (user) {
            axiosSecure.get(`/users/${user.email}`)
                .then((response) => {
                    const role = response.data.role;
                    if (role === 'admin') {
                        navigate('/dashboard/admin-home', { replace: true });
                    } else if (role === 'taskCreator') {
                        navigate('/dashboard/task-creator-home', { replace: true });
                    } else if (role === 'worker') {
                        navigate('/dashboard/worker-home', { replace: true });
                    } else {
                        navigate(from, { replace: true });
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch user role:', error);
                    navigate(from, { replace: true });
                });
        }
    }, [user, navigate, from]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;
            const result = await signInUser(email, password);

            if (result?.user) {
                toast.success('Login Successfully');
                // Fetch the user role and navigate appropriately
                axiosSecure.get(`/users/${result.user.email}`)
                    .then((response) => {
                        const role = response.data.role;
                        if (role === 'admin') {
                            navigate('/dashboard/admin-home', { replace: true });
                        } else if (role === 'taskCreator') {
                            navigate('/dashboard/task-creator-home', { replace: true });
                        } else if (role === 'worker') {
                            navigate('/dashboard/worker-home', { replace: true });
                        } else {
                            navigate(from, { replace: true });
                        }
                    })
                    .catch((error) => {
                        console.error('Failed to fetch user role:', error);
                        navigate(from, { replace: true });
                    });
            } else {
                toast.error('Invalid email or password');
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };

    if (user || loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="flex w-full max-w-sm mx-auto mt-12 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-cover lg:block lg:w-1/2 pt-12">
                    <Lottie animationData={login} />
                </div>
                <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 text-black bg-[#416EF0]">
                    <h2 className="mb-2 text-xl font-semibold text-center">Login to your account</h2>
                    <p className="text-sm text-center dark:text-gray-600">
                        Do not have an account? Please{' '}
                        <Link to="/register" className="text-white font-bold">
                            Register
                        </Link>
                    </p>
                    <Toaster />
                    <div className="flex items-center w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <Helmet>
                                <title>Picoworkers | Login</title>
                            </Helmet>
                            <SocialLogin />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    className="input input-bordered"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className="input input-bordered"
                                    {...register('password', { required: true })}
                                />
                                {errors.password && <span className="text-red-500">This field is required</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover text-black">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-2">
                                <button className="btn bg-[#0044BC] hover:bg-[#6BA6FF] text-white rounded border-none">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
