import { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'
import {type User, SortBy} from './types.d'

import {Users} from './components/Users.tsx'

function App() {
const [users, setUsers] = useState<User[]>([])
const [coloredRows, setColoredRows] = useState(false)
const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
const [filterUsersByCountry, setfilterUsersByCountry] = useState<string | null>(null)
const originalUsers = useRef<User[]>([])


const toggleColoredRows = () => {
  setColoredRows(!coloredRows)
}
const toggleSortUsersByCountry = () => {
  const newSort = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
  setSorting(newSort)
}


const handleDelete = (idUser:string) => {
  setUsers(users.filter((user) => user.login.uuid !== idUser))
}

const handleChangeSort = (sortBy: SortBy) => {
  sortBy == sorting ?  setSorting(SortBy.NONE) : setSorting(sortBy)
}

const resetUsers = () => {
  setUsers(originalUsers.current)
}

const sortedUsers = useMemo(() => {
  console.log('sorted Users')
  if(sorting == SortBy.NONE) return users

  const compareProps: Record<string, (user:User) => any> = {
    [SortBy.COUNTRY]: user => user.location.country,
    [SortBy.NAME]: user => user.name.first,
    [SortBy.LASTNAME]: user => user.name.last
  }

  return [...users].sort((a, b) => {
    const prop = compareProps[sorting]
    return prop(a).localeCompare(prop(b))
  })
 
}, [users, sorting])

const filteredUsers = useMemo(() => {
  console.log('filtered Users')
  return typeof filterUsersByCountry === 'string' && filterUsersByCountry.length >0 ? 
  sortedUsers.filter((user) => user.location.country.toLocaleLowerCase().includes(filterUsersByCountry.toLocaleLowerCase())) 
    : sortedUsers
}, [sortedUsers, filterUsersByCountry])


useEffect(
  () => {
      fetch('https://randomuser.me/api/?results=100')
      .then(response => response.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })

  },[])

  return (
    <>
      <h1>Prueba técnica que seguramente no sepa acabar</h1>
      <header>
        <button onClick={toggleColoredRows}>
          {coloredRows ? 'No colorear filas' : 'Colorear filas'}      
        </button>

        <button onClick={toggleSortUsersByCountry}>
          {sorting == SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>

        <button onClick={resetUsers}>
          Resetear usuarios
        </button>

        <input placeholder= "Filtra por país:" type="text" onChange={(e) => setfilterUsersByCountry(e.target.value)}/>

      </header>
      <Users handleChangeSort={handleChangeSort} handleDelete={handleDelete} coloredRows={coloredRows} users={filteredUsers} />
    </>
  )
}

export default App
