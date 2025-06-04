import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import ButtonLogout from "./ButtonLogout";

function HeaderProfile() {
  const userId = useAppSelector((state: { user: { id: number } }) => state.user.id);

  return (
    <div className="d-flex flex-column">
      <Link to={`/reservations?id=${userId}`} className="mb-1 text-decoration-none">
        <Button variant="primary" >
          Мои брони
        </Button>
      </Link>
      <ButtonLogout />
    </div>
  )
}

export default HeaderProfile;
