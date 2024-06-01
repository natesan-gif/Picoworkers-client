import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import login from '../../assets/login.json'
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import Lottie from 'lottie-react';
import axios from 'axios';

const Login = () => {
    const { signInUser, user,loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const onSubmit = (data) => {
    //     const { email, password } = data;
   
    //     signInUser(email, password)
    //         .then((result) => {
    //             if (result.user) {
    //                 navigate(from);
    //             } else {
    //                 toast.error('Invalid email or password');
    //             }
    //                  toast.success('Logged  in successfully');
    //         })
    //         .catch((error) => {
    //             console.error(error.message);
    //             toast.error('Invalid email or password');
    //         });
    // };
    const onSubmit = async (info) => {
  try {
    const { email, password } = info;
    
    const result = await signInUser(email, password);
//  const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/jwt`,
//         {
//           email: result?.user?.email,
//         },
//         { withCredentials: true }
//       )
    //   console.log(data)
      navigate(from, { replace: true })
      toast.success('Login Successfully')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

    if (user || loading) return;
    return (
        <div>
            <div className="flex w-full max-w-sm  mx-auto mt-12 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
     <div className="hidden bg-cover lg:block lg:w-1/2 pt-12 ">
                    <Lottie animationData={login} > </Lottie>	
    </div>
   <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 text-black bg-[#416EF0]">
            <h2 className="mb-2 text-2xl font-semibold text-center">Login to your account</h2>
            <p className="text-sm text-center dark:text-gray-600">
                Do not have an account? Please {' '}
                <Link to="/register" className="text-white font-bold">
                    Register
                </Link>
            </p>
            <Toaster />
            <div className="flex items-center w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <Helmet>
                        <title>Surplus Saver | Login</title>
                            </Helmet>
                             <SocialLogin></SocialLogin>
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