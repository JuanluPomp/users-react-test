
import type { User } from '../../types'
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import TableUserData from './TableUserData'


//foto , nombre, apellido / email / pais / acciones

interface userItemProps { 
    users: User[]
    fieldsDraw: boolean,
    setUsers : React.Dispatch<React.SetStateAction<User[] | undefined>>
}
export default function UserItem({ users, fieldsDraw, setUsers }: userItemProps) {
    
    return (
        <Table className=' border-2 border-gray-300 '>
            <TableCaption>Users </TableCaption>
            <TableHeader className=' bg-gray-400'>
                <TableRow className=' text-lg'>
                    <TableHead className=" text-center">Photo</TableHead>
                    <TableHead className=" text-center">Name</TableHead>
                    <TableHead className=" text-center">Last Name</TableHead>
                    <TableHead className=" text-center">Email</TableHead>
                    <TableHead className=" text-center">Country</TableHead>
                    <TableHead className=" text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className=' bg-slate-100'>
                {users.map((user, i) => (
                    <TableUserData
                        key={user.id.value}
                        user={user}
                        fieldsDraw={fieldsDraw}
                        i={i}
                        setUsers={setUsers}
                    />
                ))}
            </TableBody>
        </Table>

    )
}
