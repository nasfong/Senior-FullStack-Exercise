import mongoose, { Schema, Document } from "mongoose";

export interface IStudentEnrollment extends Document {
  name: string;
  phone: string;
  email: string;
  course: mongoose.Schema.Types.ObjectId;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
});

export default mongoose.model<IStudentEnrollment>("Students", StudentSchema);
