import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsersState } from "../../store/users/usersSlice";
import UsersList from "./UsersList";
import UsersSearchForm from "./UsersSearchForm";

function UsersMain() {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector(state => state.users);

  useEffect(() => {
    if (usersState.offset !== 0 || usersState.email.length !== 0 || usersState.name.length !== 0 || usersState.contactPhone.length !== 0) {
      dispatch(setUsersState({ offset: 0, email: '', name: '', contactPhone: '' }));
    }
  }, []);

  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Пользователи</p>
        <UsersSearchForm />
      </Container>
      <UsersList />
    </Container>
  )
}

export default UsersMain