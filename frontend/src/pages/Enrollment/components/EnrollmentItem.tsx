import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToCustomString } from "@/lib/utils";

type EnrollmentItemProps = {
  data?: Enrollment[]
  isLoading?: boolean
}

export const EnrollmentItem = ({ data, isLoading = false }: EnrollmentItemProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className='h-24 text-center'
            >
              Loading…
            </TableCell>
          </TableRow>
        ) : (
          data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.student?.name}</TableCell>
              <TableCell>{item.student?.phone}</TableCell>
              <TableCell>{item.student?.email}</TableCell>
              <TableCell>{item.course?.name}</TableCell>
              <TableCell>{formatDateToCustomString(item.date)}</TableCell>
            </TableRow>
          )))}
      </TableBody>
    </Table>
  )
}

