import { format, isToday } from "date-fns"

const DateSeparator = ({ date }: { date: string }) => {
    return (
        <div className="text-center text-gray-500 text-sm my-2">
            {isToday(new Date(date)) ? 'Today' : format(new Date(date), 'MMMM dd, yyyy')}
        </div>
    )
}

export { DateSeparator }