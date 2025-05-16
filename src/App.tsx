import { useEffect, useRef, useState } from "react";
import type { Info, User } from "./types";
import UserItem from "./components/Users/User";
import { useDebouncedCallback } from 'use-debounce';
import { useLocation } from "react-router";

function App() {
  const [ info, setInfo] = useState<Info>();
  const [users, setUsers] = useState<User[]>([]);
  const [fieldsDraw, setFieldsDraw] = useState(false);
  const [search, setsearch] = useState<string >('')
  const [debouncedSearch, setDebouncedSearch] = useState<string >('')
  const [sortUsers, setSortUsers] = useState(false)
  const {pathname} = useLocation()
  //el useRef es como la mezcla de un etado y una variable, pero el valor o datos que almacena 
  //percisten entre renderizados, y para acceder a su valor es con la propiedad "current"
  const originalUsers = useRef<User[]>([])

  const debounced = useDebouncedCallback(value => {
    setDebouncedSearch(value.toLowerCase().trim())
  }, 500)

  useEffect(() => {
    fetch(`https://randomuser.me/api?results=10`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        setInfo(res.info);
        originalUsers.current = res.results
        console.log(res.results);
      })
      .catch(error => {
        console.log("error fetching data: ", error)
      })
  }, []);

  useEffect(() => {
     handleRestart()
    if(debouncedSearch === null || debouncedSearch === ''){
      setsearch('')
      window.history.pushState({}, '', pathname)
      return
    }
    console.log('busqueda: ', debouncedSearch)
    const url = `${pathname}?country=${debouncedSearch}`
    window.history.pushState({}, '', url)
    setUsers(prev => {
      return prev?.filter(user => user.location.country.toLocaleLowerCase().trim().includes(debouncedSearch))
    })
  }, [debouncedSearch])



  const handleDrawFields = () => {
    setFieldsDraw(!fieldsDraw);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value)
    setsearch(e.target.value)
  }
  const handleRestart = () => {
    setUsers(originalUsers.current)
  }

  const sortedUsers = sortUsers 
  ? [...users!].sort((a,b) => {
    return a.name.first.localeCompare(b.name.first)
  })
  : users

  return (
    <>
      <div className=" flex flex-col items-center mt-10">
        <h1 className=" text-center text-2xl font-bold text-white">
          Prueba tecnica 55k
        </h1>
        <header className=" flex justify-between items-center space-x-4 mt-4">
          <button
            className=" border border-black bg-gray-900 hover:bg-gray-950 cursor-pointer text-white rounded-md p-1 px-2"
            onClick={handleDrawFields}
          >
            {fieldsDraw ? 'Regresar color original' : 'Colorear filas'}
          </button>
          <button 
            onClick={() => setSortUsers(!sortUsers)}
            className=" border border-black bg-gray-900 hover:bg-gray-950 cursor-pointer text-white rounded-md p-1 px-2">
            {sortUsers ? 'Ordenar a estado original' : 'Ordenar por nombre'}
          </button>
          <button 
            onClick={handleRestart}
            className=" border border-black bg-gray-900 hover:bg-gray-950 cursor-pointer text-white rounded-md p-1 px-2">
            Restaurar el estado inicial
          </button>
          <input
            value={search}
            onChange={handleOnChange}
            className=" border border-black bg-gray-600 text-sm text-white py-1.5 px-1 rounded-sm"
            placeholder=" Filtar por pais"
            type="search"
          />
        </header>
        <div className=" container mx-auto mt-10 max-w-3/4 overflow-y-auto h-[80vh]">
          {users && users.length > 0
          ? (
            <UserItem 
            users={sortedUsers!}
            fieldsDraw={fieldsDraw}
            setUsers={setUsers}
          />
          )
          : (
            <p className=" text-center font-bold text-white text-3xl">No hay ususarios existentes</p>
          )
          }
        </div>
      </div>
    </>
  );
}

export default App;
