import mongoose, { Schema, Document } from "mongoose";

export interface IEnrollmentInput {
  course: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  date: Date;
}

export interface IEnrollment extends Document, IEnrollmentInput {}

const EnrollmentSchema: Schema = new Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
