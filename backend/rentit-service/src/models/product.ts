import mongoose from "mongoose";

interface ProductAttributes {
    productName: string;
    productPrize: number;

}


export interface ProductDocument extends mongoose.Document {
    productName: string;
    productPrize: number;
}


interface ProductModel extends mongoose.Model<ProductDocument> {
    build(attributes: ProductAttributes): ProductDocument

}

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
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

productSchema.statics.build = (attributes: ProductAttributes) => {
    return new Product(attributes);
}

const Product = mongoose.model<ProductDocument, ProductModel>('Product',productSchema);

export { Product }