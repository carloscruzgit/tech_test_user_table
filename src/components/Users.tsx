import { User, SortBy } from '../types.d'

interface Props{
    users: User[],
    coloredRows: boolean,
    handleDelete: (idUser: string) => void,
    handleChangeSort: (sortBy: SortBy) => void
}

export function Users({users, coloredRows, handleDelete, handleChangeSort}: Props) {
    return (
        <>
            <h1>Users</h1>
            <main>
                <table style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th className = 'headerPointer' onClick={() => handleChangeSort(SortBy.NAME)}>Nombre</th>
                            <th className = 'headerPointer' onClick={() => handleChangeSort(SortBy.LASTNAME)}>Apellido</th>
                            <th className = 'headerPointer' onClick={() => handleChangeSort(SortBy.COUNTRY)}>País</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => {
                            const backgroundRowColorClass = (index % 2  && coloredRows) ? 'backgroundGrey' : ''
                            return (
                            <tr className = {backgroundRowColorClass} key={user.login.uuid}>
                                <td> <img src={user.picture.thumbnail} alt="" /></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button onClick= {() => {
                                        handleDelete(user.login.uuid)
                                    }}>Borrar</button>
                                </td>
                            </tr>
                            )})}
                    </tbody>
                </table>
            </main>

        </>
    )
}