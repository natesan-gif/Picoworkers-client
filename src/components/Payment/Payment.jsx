import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_pk);
const Payment = () => {
    return (
        <div className='w-full min-h-[calc(100vh-400px)] justify-center items-center text-gray-800 rounded-xl '>
            <Helmet>
        <title>Pay | Dashboard</title>
      </Helmet>
            <div className="max-w-[500px] mx-auto items-center text-center justify-center pt-20 space-y-4">
               
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
         </div>
        </div>
    );
};

export default Payment;