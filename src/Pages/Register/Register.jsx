import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import registration from "../../assets/registration.json";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import useAuth from "../../Hooks/useAuth.jsx";
import Lottie from "lottie-react";
import useAxiosPublic from "../../Hooks/useAxiosPublic.jsx";
import { TbFidgetSpinner } from "react-icons/tb";
import SocialLogin from "../Login/SocialLogin";
import Spinner from "../../components/Spinner/Spinner";
import Swal from 'sweetalert2';
// import axios from "axios";
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api =`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Register = () => {
  const { createUser, updateUserProfile, user, loading, setUser, reset } = useAuth();
  const navigate = useNavigate();
  const axiosPublic=useAxiosPublic()
  const from = "/";

  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //  console.log(data) 
    //image upload to the imgbb and then get an url
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-Type': 'multipart/form-data',
      }
    });
    // console.log(res.data)
    if (res.data.success) {
      const photoURL = res.data.data.display_url
      const { email, password, yourName, role } = data;
      console.log(data)
      try {
        const result = await createUser(email, password);
        await updateUserProfile(yourName, photoURL);
        setUser({ ...result?.user, photoURL: photoURL, displayName: yourName });
    let coins = 0;
        if (role === "worker") coins = 10;
        else if (role === "taskCreator") coins = 50;
        const userInfo = {
          email: result?.user?.email,
          image: photoURL,
          name: yourName,
          role: data.role,
          coins: coins,// Assuming data.role is defined elsewhere
        };

        const response = await axiosPublic.put("/users", userInfo);
console.log(response)
        if (response.data.upsertedId) {

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (user || loading) return;
  return (
    <div>
      <Helmet>
        <title>| Register</title>
      </Helmet>
      <div className=" flex w-full max-w-sm  mx-auto mt-12 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl ">
        <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 text-black bg-[#416EF0] ">
          <div>
            <h2 className="text-xl text-center mt-4">Register Account Now!</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
             <SocialLogin></SocialLogin>
            <Toaster />
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Your Name*</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                className="input input-bordered"
                {...register("yourName", { required: true })}
              />
              {errors.yourName && (
                <span className="text-red-500">This field is required</span>
              )}
              <label className="label">
                <span className="label-text text-black">Photo URL*</span>
              </label>
              {/* <input
                type="text"
                placeholder="Photo URL"
                name="photo"
                className="input input-bordered"
                {...register("photoURL", { required: true })}
              /> */}
           
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    
              {errors.image && (
                <span className="text-red-500 ">This field is required</span>
              )}

              <label className="label">
                <span className="label-text text-black">Email*</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Password*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <IoMdEyeOff />}
                </button>
              </div>
              {errors.password && errors.password.type === "required" && (
                <span className="text-red-500">This field is required</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="text-red-500">
                  Password must be at least 6 characters long
                </span>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <span className="text-red-500">
                  Password must contain at least one uppercase letter, one
                  lowercase letter
                </span>
              )}
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-black"
                >
                  Forgot password?
                </a>
              </label>
            </div>
               <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Role*</span>
                            </label>
                            <select defaultValue="default" {...register('role', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a role</option>
                                <option value="worker">Worker</option>
                                <option value="taskCreator">Task Creator</option>
                               
                            </select>
                        </div>
            <div className="form-control mt-6">
              <button  disabled={loading} className="btn  bg-[#0044BC] hover:bg-[#6BA6FF] text-white rounded border-none">
           {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
              </button>
            </div>
          </form>
         
          <p className="text-center mb-4">
            Already have an account? Please {" "}
            <Link className="text-white font-bold" to="/login">
              Login
            </Link>
          </p>
        </div>
            <div className="hidden bg-cover lg:block lg:w-1/2 pt-12">
          <Lottie animationData={registration}> </Lottie>
        </div>
      </div>
    </div>
  );
};

export default Register;