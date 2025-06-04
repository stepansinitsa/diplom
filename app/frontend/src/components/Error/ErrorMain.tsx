import { Container } from "react-bootstrap"

function ErrorMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Страница не найдена</p>
      </Container>
    </Container>
  )
}

export default ErrorMain
