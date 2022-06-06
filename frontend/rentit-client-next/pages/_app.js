import "bootstrap/dist/css/bootstrap.css";
import customClient from "../callapi/custom-client";

import Header from "../components/header";

// so we would want our header component to dynamically display values based 
// on wheather or not the user is signed in  
// so what we want to have is 
// at present index.js needs to know current user
// we somehow also want our header to know what current user is  
// so rather than having 2 separate requests to fetch same data  
// we need to centralize that logic up into the app component alone
/*
            App Component [getinitialPorops to fetch current user]
                            [ and pass this user data to other components like header and index.js]

                            Header

    index.js     signup.js       signin.js

*/

// NOTE: the arguments that are provided to getinitialprops function for a page
//   context === { req, res }
// is different from arguments for getinitialprops in a custom App Component  
//   context === { Component, ctx:{ req, res }}

// when we define a getinitalprops for the app component we still want 
// to have a getinitalprops available at index.js page
// But the problem is when we have geinitailprops in app component this results
// in getiniitialprops from index.js or any individual pages do not get automatically
// invoked anymore

// So to fix this issue we are going to get getinitialprops function and we are going 
// to manually invoke it inside the custom appcomponents getinitialprops function  
// so we are going to be fetching 2 sets of data one such data for 
// the app component  and one such data for the landing page
// and we are going to pass down all that data as props to the app component  
// and chop some of that data and make sure that goes to the landing page


const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div> 

        {/* <h1>Header {currentUser.email} </h1> */}

        <Header currentUser={currentUser}/>
        <Component {...pageProps} />
        </div>
    );
};




// now we need to make sure the pageProps info get passed into the page we are trying to display




AppComponent.getInitialProps = async appContext => {
    //console.log(Object.keys(appContext));
    //return {};

    // console.log(appContext);
    // you will see that the log will have a line or property on it
    // Component: [Function: LandingPage]
    // Component is a reference to [Function: LandingPage]
    // and we can invoke the getinitialprops functing in that component 

    const client = customClient(appContext.ctx);
    // ctx property is intended to go into individual page
    // appContext is intended to go into AppComponent
    
    // now its executing getinitialprops function for both app component and for individual pages
    // right now we have getinitialprops for our landing pag
    // but we also have pages that do not have signin and signup function
    // so we need to handle the case where getinitialprops is undefined
    // if undefined we dont want to try and fetch any other data
    // and this make sure it works fine without crashing pages like signin and signup

    // const { data } = await client.get('/api/user/currentuser');
    const res = await client.get('/api/user/currentuser').catch((err) => {
        console.log(err.message);
    });
    let data = 'null';
    if (res) {
        data = res.data
    }


    // so now we are getting some information that is common for every page

    // and below we have logic to get informationg for particular pages

    //const pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    let pageProps = {};
    if (appContext.Component.getInitialProps) {

        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }


    // now we need to make sure to take pageProp, we take any data that we are
    // fetching for the app component and we need to return all the stuff 
    // and somehow get displayed up between the Header and componet of the page 
    // that we are actually trying to show

    console.log(pageProps);


    console.log(data);


    // return data;
    return {
        pageProps,
        //currentUser: data.currentUser
        ...data
    }
};

export default AppComponent;