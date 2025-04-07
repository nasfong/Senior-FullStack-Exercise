import Enrollment, { IEnrollment, IEnrollmentInput } from "../models/enrollment";

export const findAll = async () => {
  return await Enrollment.find()
    .populate("course")
    .populate("student");
};

export const create = async (enrollmentData: IEnrollmentInput): Promise<IEnrollment> => {
  const enrollment = new Enrollment(enrollmentData);
  return await enrollment.save();
};

