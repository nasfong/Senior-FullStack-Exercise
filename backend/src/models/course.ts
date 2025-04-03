import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  name: string;
  description: string;
  capacity: number;
  price: number
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true, indexedDB: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
});

CourseSchema.index({ name: "text", description: "text" });

export default mongoose.model<ICourse>("Course", CourseSchema);
