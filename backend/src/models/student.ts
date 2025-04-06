import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  phone: string;
  email?: string;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
});

export default mongoose.model<IStudent>("Student", StudentSchema);
