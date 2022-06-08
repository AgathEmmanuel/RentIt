const RentInsList = ({ rentins }) => {
    return <div>
        {rentins.map(rentin => {
            return <li key={rentin.id}>
                {rentin.product.productName} --- {rentin.status}
            </li>
        })}
    </div>;
}

RentInsList.getInitialProps = async (context,client) => {
    const { data } = await client.get('/api/rentit');


    return { rentins: data };
};


export default RentInsList;
