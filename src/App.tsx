import { useEffect, useState } from 'react'
import type { Info, User } from './types'
import UserItem from './components/Users/User'



function App() {
  const [info, setInfo] = useState<Info>()
  const [users, setUsers] = useState<User[]>()
  useEffect(() => {
    fetch(`https://randomuser.me/api?results=${15}`)
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
        setInfo(res.info)
        console.log(res.results)
      })
  }, [])
  return (
    <>
      <div className=' flex flex-col items-center mt-10'>
        <h1 className=' text-center text-2xl font-bold'>Prueba tecnica 55k</h1>
            <div className=' container mx-auto mt-10'>
              <UserItem
              users={users!}
            />
            </div>
      </div>
      
    </>
  )
}

export default App
