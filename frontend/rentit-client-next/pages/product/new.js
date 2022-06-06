const NewProduct = () => {
    return (
    <div>
        <h1>Rent out a Product  </h1>
        <form>
            <div className="form-group">
                <label>Name</label>
                <input className="form-control" />
            </div>
            <div className="form-group">
                <label>Prize</label>
                <input className="form-control" />
            </div>
            <button className="btn btn-primary">Create</button>
        </form>
    </div>

    );
};


export default NewProduct;