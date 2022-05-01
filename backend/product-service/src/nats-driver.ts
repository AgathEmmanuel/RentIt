import stan, { Stan } from 'node-nats-streaming';

class NatsDriver {
    private _stanClient?: Stan;

    get stanCient() {
        if (!this._stanClient) {
            throw new Error('NATS client cannot be accessed befor connectin')
        }
        return this._stanClient;
    }



    connect(clusterId: string, clientId: string, url: string) {
        this._stanClient = stan.connect(clusterId,clientId,{ url });



        return new Promise<void>((resolve, reject) => {

        this.stanCient.on('connect',() => {
            console.log('Connection to NATS successful');
            resolve();
        });

        this.stanCient.on('error',(err) => {
            reject(err);

        });

     });

    }

}


export const natsDriver = new NatsDriver();

