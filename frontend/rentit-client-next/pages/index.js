//import axios from "axios";
// import customClient from "../callapi/custom-client";

/*
export default () => {
    return <h1>Landing Page</h1>;
};

*/



// const LandingPage = ({ message }) => {
const LandingPage = ({ currentUser,products }) => {

    // console.log(products)


    const productList = products.map(product => {
        return (
            <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.productPrize}</td>
            </tr>
        )
    })
    return (
        <div>
            <h1>Products</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {productList}
                </tbody>
            </table>
        </div>
    )

    // console.log('I am the bot', message);

    // axios.get('/api/user/currentuser')

    // NOTE: while we try to execute to axios request here it works very fine
    // but when we did the same in getInitialProps it failed
    // so there is definitely some environmental changes here
    // the code in getInitialProps is executed inside the server  
    // so there is a difference when we execute our code from server vs client
    // To solve this we have two methods
    // - we can make the request to the specific microservice using the service ip
    // - or we can make a call to nginx with the cookie and nginx routes the request to correct microservice

    // Request from getInitialProps might be executed from the client or the server 
    // we need to have some logic to figure out what our env is so we can use
    // the correct domain


    console.log('Landing page',currentUser,'is current user');

    console.log('executed in client testing.. hello');

    // return <h1>Landing Page</h1>;

    return currentUser ? ( <h1> You are signed in </h1> ) : ( <h1> You are not signed in</h1> );


};


LandingPage.getInitialProps = async (context, client, currentUser) => {

    // getInitialProps is specific to next js 

    // if we try to implement getinitialprops next js will call this function
    // while its attempting to render our application on the server
    // its our opportunity to fetch some data that the component needs during 
    // this server side rendering process
    // getinitialprops will be automatically called on server when nextjs decides to 
    // show this component, once invoked any data that return from it in the form of 
    // an object will be provided to our component as a prop
    // then nextjs will get data from all the components rendered and sent back a 
    // full response

    // NOTE: hooks are used inside a component, getInitialProps is not a ccomponent
    // its a plain function  

    /*
    const response = axios.get('/api/user/currentuser').catch((err) => {
        console.log(err.message);
    });

    */

    /*
    console.log('executed in server testing.. hello');
    return {};
    */

    // console.log('Helloo I am getInitialProps')
    // return { message: 'hello' };

    //return response.data;




    //console.log(req.headers);

    // we need to have some logic to figure out what our env is so we can use
    // the correct domain


/*

    if (typeof window === 'undefined') {
        // this means the code is on the server 
        // so any request made should be made to http://ingress-nginx.ingress-nginx...

          // 'http://SERVICENAME.NAMESPACE.svc.cluster.local'
          // 'http://ingress-nginx-controller.svc.cluster.local/api/user/currentuser',


        const { data } = await axios.get(
          'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/user/currentuser',
          { headers: req.headers }
     //     { headers: { Host: 'rentit.dev', }, }
        );
        return data;
       //return {}


    } else {
        // we are on the browser so requests can be made withe basic url

        const { data } = await axios.get('/api/user/currentuser');

        // { currentUser: {} }

        return data;

    }
    return {};
 */


    //const { data } = await customClient(context).get('/api/user/currentuser')


    /*

    console.log('Landing page');
    // this was added to show that because we added getinitial props to the custom page
    // the old one is not getting called anymore  

    const res = await customClient(context).get('/api/user/currentuser').catch((err) => {
        console.log(err.message);
    });
    let data = 'null';
    if (res) {
        data = res.data
    }

    */

/*
    try {
    const res = await customClient(context).get('/api/user/currentuser')
    }
    catch(err) {
        console.log(err.message);
        var res = 'null'
    };
    let data = 'null';
    if (res) {
        data = res.data
    }

*/

    // return data;

    // return {};

    const { data } = await client.get('/api/product');

    return { products: data };

};


export default LandingPage;