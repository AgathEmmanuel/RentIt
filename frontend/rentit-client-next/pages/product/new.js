import { useState } from "react";



const NewProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    // get triggered right when user clicks inside the input box and then outside
    const actionOnBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) {
            return;
        }
        setPrice(value.toFixed(2));
    }

    return (
    <div>
        <h1>Rent out a Product  </h1>
        <form>
            <div className="form-group">
                <label>Name</label>
                <input value= {name} onChange={(e) => setName(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label>Prize</label>
                <input 
                value={price} 
                onBlur={actionOnBlur}
                onChange={(e) => setPrice(e.target.value)} className="form-control" />
            </div>
            <button className="btn btn-primary">Create</button>
        </form>
    </div>

    );
};


export default NewProduct;