import mongoose from "mongoose";

const Schema = mongoose.Schema;

const addressSchema = new Schema({});
const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);
export default Address;
