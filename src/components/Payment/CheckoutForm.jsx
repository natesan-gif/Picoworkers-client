import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Spinner/LoadingSpinner";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const { data , isLoading } = useQuery({
    queryKey: ["price", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/buy/${id}`);
   
      return response.data;
    },
  });

  console.log(data)
  
useEffect(() => {
    if (data?.balance) {
      axiosSecure
        .post("/create-payment-intent", { price: data.balance })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to create payment intent");
        });
    }
  }, [axiosSecure, data?.balance]);
  const { data: users } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user?.email}`);
      // console.log(response.data)
      return response.data;
    },
  });



  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: users?.email || "",
            name: users?.name || "",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      const paymentInfo = {
        transactionId: paymentIntent.id,
        date: new Date(),
        email: users.email,
        name: users.name,
        price: data.balance,
        coins:data.coins
        // Add more relevant information if needed
      };

      try {
        // Save payment info in the payment collection (db)
        const { data } = await axiosSecure.post("/payments", paymentInfo);
        console.log(data);

        toast.success("Coin buy Successfully");
        // navigate('/dashboard/payment-history');
        setTransactionId(paymentIntent.id);
      } catch (err) {
        console.log(err);
      }
    }

    setProcessing(false);
  };

  if(isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
 <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex mt-8 justify-around">
          <button
            disabled={!stripe || !clientSecret || processing}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {processing ? (
              <ImSpinner9 className="animate-spin m-auto" size={24} />
            ) : (
              "Pay"
            )}
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      )}
    </>
  );
};

export default CheckoutForm;
