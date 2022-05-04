import mongoose, { mongo } from "mongoose";


interface PaymentAttributes {
    rentitId: string;
    stripeId: string;
}


interface PaymentDocument extends mongoose.Document {

    rentitId: string;
    stripeId: string;
    version: number;


}


interface PaymentModel extends mongoose.Model<PaymentDocument> {
    build(attributes: PaymentAttributes): PaymentDocument;
}

const paymentSchema = new mongoose.Schema({
    rentitId: {
        required: true,
        type: String
    },
    stripeId: {
        required: true,
        type: String
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
})


paymentSchema.statics.build = (attributes: PaymentAttributes) => {
    return new Payment(attributes);


};


const Payment = mongoose.model<PaymentDocument,PaymentModel>('Payment',paymentSchema);


export { Payment };