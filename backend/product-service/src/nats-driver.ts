import stan, { Stan } from 'node-nats-streaming';

class NatsDriver {
    private _stanClient?: Stan;

    connect(clusterId: string, clientId: string, url: string) {
        this._stanClient = stan.connect(clusterId,clientId,{ url });

        return new Promise<void>((resolve, reject) => {

        this._stanClient!.on('connect',() => {
            console.log('Connection to NATS successful');
            resolve();
        });

        this._stanClient!.on('error',(err) => {
            reject(err);

        });

     });

    }

}


export const natsDriver = new NatsDriver();

