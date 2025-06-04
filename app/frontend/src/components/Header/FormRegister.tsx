import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../api/useFetchData";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/user/userSlice";
import { RegData } from "../../types/interfaces";

function FormRegister() {
  const [regData, setRegData] = useState<RegData>({
    email: '',
    name: '',
    password: '',
  });
  const { authUser } = useFetchData();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const regHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (regData.email.length === 0) {
        iziToast.warning({
          message: 'Введите почту!',
          position: 'bottomCenter',
        });
        return;
      }

      if (regData.name.length === 0) {
        iziToast.warning({
          message: 'Введите имя!',
          position: 'bottomCenter',
        });
        return;
      }

      if (regData.password.length < 6) {
        iziToast.warning({
          message: 'Пароль должен содержать 6 и более символов!',
          position: 'bottomCenter',
        });
        return;
      }

      authUser.register(regData)
        .then(result => {
          dispatch(login({ token: result.data.token, role: result.data.role, id: result.data.id }));
          iziToast.success({
            message: 'Вы успешно зарегистрировались',
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
    <Form className="mb-3" onSubmit={regHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Почта</Form.Label>
        <Form.Control type="email" placeholder="Введите почту" onChange={(e) => setRegData({ ...regData, email: e.target.value })} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Имя</Form.Label>
        <Form.Control type="text" placeholder="Введите имя" onChange={(e) => setRegData({ ...regData, name: e.target.value })} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Телефон</Form.Label>
        <Form.Control type="tel" placeholder="Введите телефон" onChange={(e) => setRegData({ ...regData, contactPhone: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" onChange={(e) => setRegData({ ...regData, password: e.target.value })} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  )
}

export default FormRegister