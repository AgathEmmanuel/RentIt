import mongoose from "mongoose";

import { RentitStatus } from '@rentit/shared-custom-package';


import { ProductDocument } from './product';


interface RentitAttributes {
    userId: string;
    status: RentitStatus;
    expiresAt: Date;
    renit: ProductDocument;
    // here we are using Ref/Population feature to reference
    // the Rentit to  a specific product
    // such that for which product the rentit request came in
}

interface RentitDocument extends mongoose.Document {
    userId: string;
    status: RentitStatus;
    expiresAt: Date;
    renit: ProductDocument;
    // here we are using Ref/Population feature to reference

}

const rentitSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(RentitStatus),
        default: RentitStatus.RentitCreated
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

interface RentitModel extends mongoose.Model<RentitDocument> {
    build(attributes: RentitAttributes): RentitDocument;

}

rentitSchema.statics.build = (attributes: RentitAttributes) => {
    return new Rentit(attributes);
}

const Rentit = mongoose.model<RentitDocument, RentitModel>('Rentit',rentitSchema);

export { Rentit };