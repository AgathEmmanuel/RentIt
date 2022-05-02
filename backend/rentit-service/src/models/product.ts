import { RentitStatus } from "@rentit/shared-custom-package";
import mongoose from "mongoose";
import { Rentit } from "./rentit";

import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { version } from "typescript";

interface ProductAttributes {
    id: string;
    productName: string;
    productPrize: number;

}


export interface ProductDocument extends mongoose.Document {
    productName: string;
    productPrize: number;
    version: number;
    isBeingRentedOut(): Promise<boolean>;
}


interface ProductModel extends mongoose.Model<ProductDocument> {
    build(attributes: ProductAttributes): ProductDocument

}

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrize: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

productSchema.set('versionKey','version');
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attributes: ProductAttributes) => {
    //return new Product(attributes);
    return new Product({
        _id: attributes.id,
        productName: attributes.productName,
        productPrize: attributes.productPrize
    });
};

productSchema.methods.isBeingRentedOut = async function() {


        const rentitExisting = await Rentit.findOne({
            product: this,
            status: {
                $in: [
                    RentitStatus.RentitCreated,
                    RentitStatus.RentitAwaitingPayment,
                    RentitStatus.RentitComplete
                ]
            }

        });

        return !!rentitExisting;    //toggle ture or false 2 times



}

const Product = mongoose.model<ProductDocument, ProductModel>('Product',productSchema);

export { Product }