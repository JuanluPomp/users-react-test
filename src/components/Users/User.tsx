
import { useEffect, useState } from 'react'
import type { User } from '../../types'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import TableUserData from './TableUserData'


//foto , nombre, apellido / email / pais / acciones

interface UserData  {
    photo: User['picture']
    name: string,
    lastName: string,
    email: string,
    country: string,
}
export default function UserItem({ users }: { users: User[] }) {
    const [userData, setUserData] = useState<User>()

    return (
        <Table className=' border-2 border-gray-300 '>
            <TableCaption>Users </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className=" text-center">Photo</TableHead>
                    <TableHead className=" text-center">Name</TableHead>
                    <TableHead className=" text-center">Last Name</TableHead>
                    <TableHead className=" text-center">Email</TableHead>
                    <TableHead className=" text-center">Country</TableHead>
                    <TableHead className=" text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                    <TableUserData
                        user={user}
                    />
                ))}
            </TableBody>
        </Table>

    )
}
