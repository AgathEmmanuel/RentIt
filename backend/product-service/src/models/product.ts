import mongoose from "mongoose";


// interface with the properties to create a product
// properties required to build a new product
interface ProductAttributes {
    productName: string;
    productPrize: number;
    userId: string;
}

// interface that describes the product document in mongoose
// properties that the product has 
interface ProductDescription extends mongoose.Document{
    productName: string;
    productPrize: number;
    userId: string;
}

// interface for the product model
// properties tied to the model 
interface ProductModel extends mongoose.Model<ProductDescription>{
    build(attributes: ProductAttributes): ProductDescription;

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
        // to make sure the outputs matches the 
        // standards of message transmissio we have
        // here _id   is  converted into   id 
    }
});

// defining the build method
productSchema.statics.build = (attributes: ProductAttributes) => {
    return new Product(attributes);
};

// an actual Product model is created 
const Product = mongoose.model<ProductDescription, ProductModel>('Product',productSchema);


export { Product };