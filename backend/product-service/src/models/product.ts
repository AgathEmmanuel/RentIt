import mongoose from "mongoose";

import { updateIfCurrentPlugin } from 'mongoose-update-if-current';



// interface with the properties to create a product
// properties required to create a new product
interface ProductAttributes {
    productName: string;
    productPrize: number;
    userId: string;
}

const productSchema = new mongoose.Schema({
    // here an actual value type is listed
    // and is used by mongoose and not typescript 
    // so   the  type: String 
    // refers to the global string constructor in javascript
    // and so capital 'S'  in   String 
    // for the above cases typescript is refered 
    // and so lowercas 's' in   string
    productName: { type: String, required: true },
    productPrize: { type: Number, required: true },
    userId: { type: String, required: true }
},{
    toJSON: {
        transform(doc,ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});


// enabling versioning in mongoose and
// renaming to versionKey  to  version
productSchema.set('versionKey','version');
productSchema.plugin(updateIfCurrentPlugin);

        // to make sure the outputs matches the 
        // standards of message transmissio we have
        // here _id   is  converted into   id 


// interface for the product model
// properties tied to the model 
interface ProductModel extends mongoose.Model<ProductDocument> {
    createProduct(attributes: ProductAttributes): ProductDocument;

}



// interface that describes the product document in mongoose
// properties that the product has 
interface ProductDocument extends mongoose.Document {
    productName: string;
    productPrize: number;
    userId: string;
    version: number;
}


// defining the createProduct method
productSchema.statics.createProduct = (attributes: ProductAttributes) => {
    return new Product(attributes);
};

// an actual Product model is created 
const Product = mongoose.model<ProductDocument, ProductModel>('Product',productSchema);


export { Product };

