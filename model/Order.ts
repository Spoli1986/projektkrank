import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: ObjectId, required: true },
  createdAt: { type: String, required: true },
  sentAt: { type: String, required: true },
  addressId: { type: ObjectId, required: true },
});
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
