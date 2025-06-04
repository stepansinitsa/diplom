import { Container } from "react-bootstrap"
import HotelsAddForm from "./HotelsAddForm"

function HotelsAdd() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Добавить гостиницу</p>
        <HotelsAddForm />
      </Container>
    </Container>
  )
}

export default HotelsAdd