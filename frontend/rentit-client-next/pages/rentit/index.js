const RentInsList = ({ rentins }) => {
    return <div>
        {rentins.map(rentin => {
    return <div key={rentin.id}>
             <div className="w-75 mb-4">
             <div className="card" >
            <div className="card-body">
            <h5 className="card-title">{rentin.product.productName}</h5>
            <h4 className="card-title">Status: {rentin.status}</h4>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            </div>
            </div>
            </div>
        })}
</div>
}

RentInsList.getInitialProps = async (context,client) => {
    const { data } = await client.get('/api/rentit');


    return { rentins: data };
};


export default RentInsList;
