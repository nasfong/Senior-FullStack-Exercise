import { DeleteDialog } from "@/components/custom/delete-dialog"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Pencil, Trash2 } from "lucide-react"

type CourseItemProps = {
  item: Course
  deleteLoading: boolean
  onEdit: (item: Course) => void
  onDelete: (id: string) => void
}

export const CourseItem = ({ item, deleteLoading, onEdit, onDelete }: CourseItemProps) => {
  return (
    <>
      <div className='h-full rounded-lg border overflow-hidden dark:bg-black relative border-black dark:border-white transform hover:-translate-y-1 transition-transform duration-100 shadow'>
        <div className='w-[80%] border-t border-gray-300 dark:border-gray-600 mx-auto'></div>
        <div className='flex flex-col justify-between h-[80px] px-2 pb-2'>
          <h2 className="text-lg text-ellipsis overflow-hidden">{item.name}</h2>
        </div>
      </div>
      <div className='absolute top-2 left-2 flex gap-1'>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size='sm' variant='outline' onClick={() => onEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Edit
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DeleteDialog handleConfirm={() => onDelete(item.id)} loading={deleteLoading} >
                <Button size='sm' variant='outline'>
                  <Trash2 />
                </Button>
              </DeleteDialog>
            </TooltipTrigger>
            <TooltipContent>
              Delete
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

