import { useEffect } from "react";
import { useState } from "react";
//import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrderDisplay = ({ rentit }) => {

    const [remainingTime, setRemainingTime] = useState(0);

    const { doRequest, errors } = useRequest({
        url: '/api/payment',
        method: 'post',
        body: {
            rentitId: rentit.id,
            token: "tok_mastercard"
        },
        onSuccesfullLogin: (payment) => console.log(payment)

    })
    useEffect(() => {       // when the component first renders this function will be called

        const getRemainingTime = () => {
            console.log(rentit.expiresAt)
            console.log(new Date())
            const remainingTimeSeconds = new Date(rentit.expiresAt) - new Date();
            console.log(remainingTimeSeconds)
            setRemainingTime(Math.round(remainingTimeSeconds/1000));
        };

        getRemainingTime(); // manually invoking the funciton immediately without waiting for seconds

        const timer = setInterval(getRemainingTime, 1000);  // do this ones every second 
        // getRemainingTime is a reference to that function

        return () => {
            clearInterval(timer);
        };

    }, [rentit]);  // rentit is passed in as a dependency

    if (remainingTime < 0) {
        return <div>The time for payment expired</div>
    }

    return <div>Please pay the rent within: {remainingTime} seconds
    {/*
        <StripeCheckout 
        token={(token) => console.log(token)}
        stripeKey="pk_test_key"
        amount = {rentit.product.price * 100}
        email = {currentUser.email}
        />
        */}

        <br />
        <button onClick={doRequest} className="btn btn-primary">PayRent</button>
        <br />
        {errors}
    </div>;

};



OrderDisplay.getInitialProps = async (context, client) => {
    const { rentitId } = context.query;
    const { data } = await client.get(`/api/rentit/${rentitId}`)


    return { rentit: data };

};

export default OrderDisplay;

