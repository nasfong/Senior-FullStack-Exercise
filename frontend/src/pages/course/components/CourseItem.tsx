import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"

type CourseItemProps = {
  item: Course
}

export const CourseItem = ({ item }: CourseItemProps) => {
  return (
    <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 min-h-[267px] p-6">
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">{item.name}</h2>
          <p className="text-gray-600 text-sm truncate mb-4">{item.description}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-xl font-semibold text-gray-900 mt-auto">{formatPrice(item.price)}</p>
          <Button size="sm">
            <Link to={`/register/${item.id}`}>Register</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
