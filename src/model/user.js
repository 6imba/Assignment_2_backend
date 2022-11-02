import mongoose from 'mongoose'

// 2.defined schema of a model|collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address:  {
        type: String,
        required: true,
    }
})

// 3.create mongodb_collection mapping mongoose_model with respective mongoose_schema.
const userModel = new mongoose.model("userCollection", userSchema);

export default userModel