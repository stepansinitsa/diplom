import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../store/hooks";
import { setUsersState } from "../../store/users/usersSlice";
import { SearchUsersDto } from "../../types/interfaces";

function UsersSearchForm() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const dispatch = useAppDispatch();

  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const searchData: Partial<SearchUsersDto> = {
        offset: 0,
        email,
        name,
        contactPhone,
      };

      dispatch(setUsersState(searchData));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={searchHandler}>
      <Form.Control type="text" className="mb-3" placeholder="Введите email пользователя (можно частично)" onChange={(e) => setEmail(e.target.value)} />
      <Form.Control type="text" className="mb-3" placeholder="Введите имя пользователя (можно частично)" onChange={(e) => setName(e.target.value)} />
      <Form.Control type="tel" className="mb-3" placeholder="Введите телефон пользователя (можно частично)" onChange={(e) => setContactPhone(e.target.value)} />
      <Button variant="primary" type="submit">
        Найти
      </Button>
    </Form>
  )
}

export default UsersSearchForm
