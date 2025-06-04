import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../api/useFetchData";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/user/userSlice";

function FormAuth() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { authUser } = useFetchData();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (email.length === 0) {
        iziToast.warning({
          message: 'Введите почту!',
          position: 'bottomCenter',
        });
        return;
      }

      if (password.length < 6) {
        iziToast.warning({
          message: 'Пароль должен содержать 6 и более символов!',
          position: 'bottomCenter',
        });
        return;
      }

      authUser.login(email, password)
        .then(result => {
          dispatch(login({ token: result.data.token, role: result.data.role, id: result.data.id }));
          iziToast.success({
            message: 'Вы успешно авторизовались в системе',
            position: 'bottomCenter',
          });
          navigate('/');
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
    <Form className="mb-3" onSubmit={authHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Почта</Form.Label>
        <Form.Control type="email" placeholder="Введите почту" onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  )
}

export default FormAuth
