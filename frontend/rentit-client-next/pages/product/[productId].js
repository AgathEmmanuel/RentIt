
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const ProductDisplay = ({product}) => {

    const { doRequest, errors } = useRequest({
        url: '/api/rentit',
        method: 'post',
        body: {
            productId: product.id
        },
        onSuccesfullLogin: (rentit) => Router.push('/rentit/[rentitId]',`/rentit/${rentit.id}`),
    });

    return (
        <div>
            <h1>{product.productName}</h1>
            <h3>Price: {product.productPrize}</h3>
            <button onClick={doRequest} className="btn btn-primary">RentIt</button>
            {errors}
        </div>
    );
};


ProductDisplay.getInitialProps = async (context, client) => {
    const { productId } = context.query;
    const { data } = await client.get(`/api/product/${productId}`)

    return { product: data };
}

export default ProductDisplay;