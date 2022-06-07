import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";



const NewProduct = () => {

    const [productName, setName] = useState('');
    const [productPrize, setPrice] = useState('');

    const  { doRequest, errors } = useRequest({
        url: '/api/product',
        method: 'post',
        body: {
            productName,
            productPrize
        },
        onSuccesfullLogin: () => Router.push('/'),
    })


    const onSubmit = (event) => {
        event.preventDefault();
        doRequest();
    }



    // get triggered right when user clicks inside the input box and then outside
    const actionOnBlur = () => {
        const value = parseFloat(productPrize);

        if (isNaN(value)) {
            return;
        }
        setPrice(value.toFixed(2));
    }

    return (
    <div>
        <h1>Rent out a Product  </h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input value= {productName} onChange={(e) => setName(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label>Prize</label>
                <input 
                value={productPrize} 
                onBlur={actionOnBlur}
                onChange={(e) => setPrice(e.target.value)} className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Create</button>
        </form>
    </div>

    );
};


export default NewProduct;