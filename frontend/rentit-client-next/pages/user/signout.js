import { useEffect } from "react";
import useRequest from '../../hooks/use-request';
import Router from 'next/router';


// NOTE: the signout request should happen from the client side
// since cookie is stored in the browser

export default () => {
    const { doRequest } = useRequest({
        url: '/api/user/signout',
        method: 'post',
        body: {},
        onSuccesfullLogin: () => Router.push('/')

    });

    // to make sure we call doRequest in some point of time
    useEffect(() => {
        doRequest();

    }, []);

    return <div>Signing out</div>
}