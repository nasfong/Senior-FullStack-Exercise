import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  course: mongoose.Schema.Types.ObjectId;
  student: mongoose.Schema.Types.ObjectId;
  date: Date;
}

const EnrollmentSchema: Schema = new Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IStudent>("Enrollment", EnrollmentSchema);
