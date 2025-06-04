import iziToast from "izitoast";
import { Button, Container, Dropdown, DropdownButton, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetchData from "../../api/useFetchData";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsersState } from "../../store/users/usersSlice";
import { UserData } from "../../types/interfaces";

interface propData {
  list: UserData[],
}

function UsersTable(data: propData) {
  const usersState = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();
  const { list } = data;
  const { usersApi } = useFetchData();

  const handleNextPage = (data: string) => {
    try {
      if (data === 'plus') {
        dispatch(setUsersState({ offset: usersState.offset + usersState.limit }));
      } else if (data === 'minus') {
        dispatch(setUsersState({ offset: usersState.offset - usersState.limit }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeRole = async (id: string, role: string) => {
    try {
      usersApi.updateRole(id, role)
        .then(result => {  
          iziToast.success({
            message: `Пользователю ${result.data.email} успешно установлена роль "${role}"`,
            position: 'bottomCenter',
          });
          dispatch(setUsersState({ render: !usersState.render }));
        })
        .catch(err => {
          iziToast.error({
            message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
            position: 'bottomCenter',
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Table striped hover className="p-2 rounded text-center">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Почта</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {list.map(elem =>
            <tr key={elem._id}>
              <td>{elem.name}</td>
              <td>{elem.contactPhone}</td>
              <td>{elem.email}</td>
              <td>{elem.role}</td>
              <td>
                <Link to={`/reservations?id=${elem._id}`} className="text-decoration-none">
                  <Button variant="warning" className="mb-1">Бронирования</Button>
                </Link>
                <DropdownButton title="Выдать роль">
                  <Dropdown.Item onClick={() => handleChangeRole(elem._id, 'client')}>Клиент</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChangeRole(elem._id, 'manager')}>Менеджер</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChangeRole(elem._id, 'admin')}>Админ</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination className="mt-3">
        {usersState.offset > 0 && 
          <Pagination.Item onClick={() => handleNextPage('minus')}>
            Назад
          </Pagination.Item>
        }
        {usersState.list.length >= usersState.limit && 
          <Pagination.Item onClick={() => handleNextPage('plus')}>
            Дальше
          </Pagination.Item>
        }
      </Pagination>
      
    </Container>
  )
}

export default UsersTable;
