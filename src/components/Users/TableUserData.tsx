
import type { User } from '../../types'
import { TableCell, TableRow } from '../ui/table'

interface TableUserDataProps {
    user: User
    fieldsDraw: boolean
    i: number
    setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>
}

export default function TableUserData({user, fieldsDraw, i, setUsers}: TableUserDataProps) {
    const rowColor = i%2 === 0 ? 'bg-slate-300' : 'bg-slate-200'

    const handleDelete = () => {
        setUsers(prev => 
            prev?.filter(item => item.email !== user.email)
        )
        console.log()
    }
    return (
        <TableRow 
            className={` ${fieldsDraw && rowColor}`}>
            <TableCell className=" flex justify-center items-center">
                <img src={user.picture.thumbnail} alt="user image" />
            </TableCell>
            <TableCell className=" text-center">{user.name.first}</TableCell>
            <TableCell className=" text-center">{user.name.last}</TableCell>
            <TableCell className=" text-center">{user.email}</TableCell>
            <TableCell className=" text-center">{`${user.location.city}, ${user.location.country}`}</TableCell>
            <TableCell className=" text-center">
                <button
                    onClick={handleDelete}
                    className=' border border-gray-200 rounded-md bg-gray-600 text-white font-bold p-1 cursor-pointer w-full'
                >
                    Delete
                </button>
            </TableCell>
        </TableRow>
    )
}
