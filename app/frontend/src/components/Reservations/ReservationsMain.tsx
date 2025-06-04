import { Container } from "react-bootstrap"
import ReservationsList from "./ReservationsList"

function ReservationsMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Список броней</p>
      </Container>
      <ReservationsList />
    </Container>
  )
}

export default ReservationsMain