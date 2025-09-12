import { create } from "domain";
import mongoose, { Query } from "mongoose";
import { type } from "os";

const queryLogSchena = new mongoose.Schema({
    Query: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true,
        enum: ["broadcast", "smart"],
        default: "broadcast"
    },
    response: {
        type: Array,
        default: []
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("QeryLog", queryLogSchena);