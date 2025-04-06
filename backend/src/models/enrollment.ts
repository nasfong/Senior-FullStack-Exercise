import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEnrollmentInput {
  course: Types.ObjectId;
  student: Types.ObjectId;
  date: Date;
}

export interface IEnrollment extends Document, IEnrollmentInput {}

const EnrollmentSchema: Schema = new Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
