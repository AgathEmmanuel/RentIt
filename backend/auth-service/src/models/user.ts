import mongoose from "mongoose";
import { Password } from '../password-hasher';


interface UserAttributes {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
        }
    }, {
        toJSON: {
            transform(doc,ret) {
                delete ret.password;
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

interface UserModel extends mongoose.Model<UserDocument> {
    createUser(inputs: UserAttributes): UserDocument;
}

interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

// here we make use of function keyword instead of arrow function
// because when we deal with a middleware function we get access to 
// the document that is being saved and the user we are trying to 
// database will be available as this keyword inside the function
// if we use arrow function the context of this keyword will be 
// overwritten and will be in the actual context of this entire file
userSchema.pre('save', async function(done){
    if (this.isModified('password')) {
        const hashedPwd = await Password.createHash(this.get('password'));
        this.set('password',hashedPwd);
    }
    done();
})
userSchema.statics.createUser = (inputs: UserAttributes) => {
    return new User(inputs);
}

const User = mongoose.model<UserDocument, UserModel>('User',userSchema);

/*
const createUser = (input: UserAttributes) => {
    return new User(input);
};

export { User,createUser };
*/

export { User };
