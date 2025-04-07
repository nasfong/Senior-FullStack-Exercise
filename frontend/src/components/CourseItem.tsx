import { Link } from "react-router-dom"
import { formatPrice } from "@/lib/utils"

type CourseItemProps = {
  item: Course
}

export const CourseItem = ({ item }: CourseItemProps) => {
  return (
    <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 min-h-[267px] p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">{item.name}</h2>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <p className="text-gray-600 text-sm truncate mb-4">{item.description}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-xl font-semibold text-gray-900 mt-auto">{formatPrice(item.price)}</p>
          <Link
            to={`/register/${item.id}`}
            className="inline-block px-6 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          >
            Register
          </Link>

        </div>
      </div>
    </div>
  )
}
