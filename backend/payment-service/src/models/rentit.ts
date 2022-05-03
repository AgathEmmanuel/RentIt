import { RentitStatus } from "@rentit/shared-custom-package";
import mongoose, { mongo } from "mongoose";

interface RentitAttributes {

    id: string;
    version: number;
    status: RentitStatus;
    userId: string;
    productPrize: number;


}


interface RentitDocument extends mongoose.Document {

    version: number;
    status: RentitStatus;
    userId: string;
    productPrize: number;


}


interface RentitModel extends mongoose.Model<RentitDocument> {
    build(attributes: RentitAttributes): RentitDocument;


}



const rentitSchema = new mongoose.Schema({
    userId: { type: String, required: true, },
    productPrize: { type: Number, required: true, },
    status: { type: String, required: true, },
},{
    toJSON: {
        transform(doc,ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});


rentitSchema.statics.build= (attributes: RentitAttributes) => {
    return new Rentit({
        _id: attributes.id,
        version: attributes.version,
        productPrize: attributes.productPrize,
        userId: attributes.userId,
        status: attributes.status
    });

};



const Rentit = mongoose.model<RentitDocument, RentitModel>('Rentit',rentitSchema);

export { Rentit};