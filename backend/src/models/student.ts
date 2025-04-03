import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  phone: string;
  email?: string;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true, index: true }, // Index for faster searches
  phone: { type: String, required: true, index: true }, // Index for lookup
  email: { type: String, unique: true, sparse: true, index: true }, // Unique and indexed
});

// Compound index for name and phone to improve search performance
StudentSchema.index({ name: "text", phone: 1 });

export default mongoose.model<IStudent>("Student", StudentSchema);
