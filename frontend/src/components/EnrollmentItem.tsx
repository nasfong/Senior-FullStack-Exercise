import { formatDateToCustomString } from "@/lib/utils";

type EnrollmentItemProps = {
  data?: Enrollment[];
  isLoading?: boolean;
};

export const EnrollmentItem = ({ data, isLoading = false }: EnrollmentItemProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left font-semibold">Student Name</th>
            <th className="px-4 py-2 text-left font-semibold">Phone</th>
            <th className="px-4 py-2 text-left font-semibold">Email</th>
            <th className="px-4 py-2 text-left font-semibold">Course</th>
            <th className="px-4 py-2 text-left font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                Loading…
              </td>
            </tr>
          ) : (
            data?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{item.student?.name}</td>
                <td className="px-4 py-2">{item.student?.phone}</td>
                <td className="px-4 py-2">{item.student?.email}</td>
                <td className="px-4 py-2">{item.course?.name}</td>
                <td className="px-4 py-2">{formatDateToCustomString(item.date)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
