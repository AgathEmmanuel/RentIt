import { useEffect } from "react";
import { useState } from "react";


const OrderDisplay = ({ rentit }) => {

    const [remainingTime, setRemainingTime] = useState(0);

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


    return <div>Please pay the rent within: {remainingTime} seconds</div>;

};



OrderDisplay.getInitialProps = async (context, client) => {
    const { rentitId } = context.query;
    const { data } = await client.get(`/api/rentit/${rentitId}`)


    return { rentit: data };

};

export default OrderDisplay;

