import { Container } from "react-bootstrap";
import { useAppSelector } from "../../../store/hooks";
import HotelRoomsAddForm from "./HotelRoomsAddForm";

function HotelsRoomsAddMain() {
  const currentHotel = useAppSelector(state => state.hotels.currentHotel);

  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Добавить номер</p>
        <p className="text-muted">Отель: {currentHotel.title}</p>
        <HotelRoomsAddForm />
      </Container>
    </Container>
  )
}

export default HotelsRoomsAddMain