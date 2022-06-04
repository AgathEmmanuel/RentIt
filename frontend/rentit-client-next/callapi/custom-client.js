import axios from "axios";


export default ({ req }) => {
    if (typeof window === 'undefined') {
        // when requesting from server  

        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // when requesting from browser
        return axios.create({
            baseURL: '/'
        })
    }

}