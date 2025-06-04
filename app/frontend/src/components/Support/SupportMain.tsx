import { Container } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import SupportForm from "./SupportForm";
import SupportList from "./SupportList";

function SupportMain() {
  const user = useAppSelector(state => state.user);

  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Список обращений</p>
        {user.role === 'client' &&
          <SupportForm />
        }
      </Container>
      <SupportList />
    </Container>
  )
}

export default SupportMain