import iziToast from "izitoast";
import { useEffect, useState } from "react";
import useFetchData from "../../api/useFetchData";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsersState } from "../../store/users/usersSlice";
import LoaderMain from "../Loader/LoaderMain";
import UsersTable from "./UsersTable";

function UsersList() {
  const [error, setError] = useState<boolean>(false);
  const { usersApi } = useFetchData();
  const usersState = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(false);

    dispatch(setUsersState({ loading: true }));

    usersApi.search({
      limit: usersState.limit,
      offset: usersState.offset,
      email: usersState.email,
      name: usersState.name,
      contactPhone: usersState.contactPhone,
    })
      .then(result => {  
        if (result.data.length > 0) {
          dispatch(setUsersState({ list: result.data, loading: false }));
        } else {
          dispatch(setUsersState({ offset: 0, loading: false }));
        }
      })
      .catch(err => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
          position: 'bottomCenter',
        });
      });
  }, [usersState.offset, usersState.email, usersState.name, usersState.contactPhone, usersState.render]);

  return (
    <>
      {usersState.loading ? (
        <LoaderMain />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке списка пользователей!</p>
        ) : (
          <UsersTable list={usersState.list} />
        )
      )}
    </>
  )
}

export default UsersList