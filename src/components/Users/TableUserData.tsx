
import type { User } from '../../types'
import { TableCell, TableRow } from '../ui/table'

export default function TableUserData({user}: {user: User}) {
    return (
        <TableRow >
            <TableCell className=" text-center">{user.picture.thumbnail}</TableCell>
            <TableCell className=" text-center">{user.name.first}</TableCell>
            <TableCell className=" text-center">{user.name.last}</TableCell>
            <TableCell className=" text-center">{user.email}</TableCell>
            <TableCell className=" text-center">{`${user.location.city}, ${user.location.country}`}</TableCell>
            <TableCell className=" text-center">
                <button
                    className=' border border-gray-200 rounded-md bg-gray-500 font-bold p-1'
                >
                    Delete
                </button>
            </TableCell>
        </TableRow>
    )
}
