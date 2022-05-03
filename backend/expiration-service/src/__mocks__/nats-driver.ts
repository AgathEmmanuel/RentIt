export const natsDriver = {
    stanPubClient: {
        publisherPublish: (channelName: string, inputData: string, callback: () => void) => {
            callback();
        },
    },
};