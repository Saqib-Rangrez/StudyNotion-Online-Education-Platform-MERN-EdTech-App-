import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise ((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        // console.log( process.env.REACT_APP_RAZORPAY_KEY)

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse (token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // Initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses},
                            {
                                Authorization :  `Bearer ${token}`
                            });

        if(!orderResponse){
            throw new Error(orderResponse.data.message);
        }
        // console.log("ORDER CAPTURE RESPONSE",orderResponse);

        // Create options 
        const options = {
            key : process.env.REACT_APP_RAZORPAY_KEY,
            currency : orderResponse.data.data.currency,
            amount : `${orderResponse.data.data.amount}`,
            order_id : orderResponse.data.data.id,
            name : "StudyNotion",
            description : "Thank You for purchasing the course",
            image : rzpLogo,
            prefill : {
                name : `${userDetails.firstName}`,
                email : `${userDetails.email}`
            },
            handler : function (response) {
                // send successfull mail
                sendPaymentSuccessfulMail(response,orderResponse.data.data.amount,token);

                // verify payment
                verifyPayment({...response, courses}, token, navigate, dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            // console.log(response.error);
        })
    }catch(error){
        // console.log("PAYMENT API ERROR.....",error);
        toast.dismiss(toastId);
        toast.error("Payment Failed")
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessfulMail (response, amount, token) {
    try{
        const paymentReceived = await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId : response.razorpay_order_id,
            paymentId : response.razorpay_payment_id,
            amount
        },{
            Authorization : `Bearer ${token}`
        })

        if(paymentReceived) {
            toast.success("Payment Received");
        }
    }catch(error){
        toast.error("Error while sending email");
        // console.log(error);
    }
}

// Verify payment
async function verifyPayment (bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization : `Bearer ${token}`
        });

        if(!response){
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId);
        toast.success("Payment Successfull, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(error){
        // console.log("PAYMENT VERIFY ERROR.....", error);
        toast.dismiss(toastId);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}