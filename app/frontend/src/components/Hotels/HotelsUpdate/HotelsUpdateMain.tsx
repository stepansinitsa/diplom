import { Container } from "react-bootstrap"
import HotelsUpdateForm from "./HotelsUpdateForm"

function HotelsUpdateMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Отредактировать отель</p>
        <HotelsUpdateForm />
      </Container>
    </Container>
  )
}

export default HotelsUpdateMain