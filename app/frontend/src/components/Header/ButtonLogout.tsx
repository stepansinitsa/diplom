import iziToast from "izitoast";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/user/userSlice";

function ButtonLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    iziToast.success({
      message: 'Вы успешно вышли из системы',
      position: 'bottomCenter',
    });
    navigate('/');
  }

  return (
    <Button variant="danger" onClick={handleLogout}>
      Выйти
    </Button>
  )
}

export default ButtonLogout
