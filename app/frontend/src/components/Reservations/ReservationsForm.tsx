import iziToast from "izitoast";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../api/useFetchData";
import { useAppSelector } from "../../store/hooks";

function ReservationsForm() {
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const currentHotel = useAppSelector(state => state.hotels.currentHotel);
  const currentRoom = useAppSelector(state => state.rooms.currentRoom);
  const userId = useAppSelector(state => state.user.id);
  const { reservationsApi } = useFetchData();
  const navigate = useNavigate()

  const formHandler = async (e: any) => {
    try {
      e.preventDefault();

      const start = new Date(dateStart);
      const end = new Date(dateEnd);
      if (start >= end) {
        iziToast.error({
          message: 'Дата окончания должна быть строго больше даты начала!',
          position: 'bottomCenter',
        });
        return;
      }

      if (start.getDate() < new Date(Date.now()).getDate()) {
        iziToast.error({
          message: 'Дата начала не может быть раньше текущей даты!',
          position: 'bottomCenter',
        });
        return;
      }

      const data = {
        userId,
        hotelId: currentHotel._id,
        roomId: currentRoom._id,
        dateStart,
        dateEnd,
      };

      reservationsApi.addReservation(data)
        .then(() => {          
          iziToast.success({
            message: `Вы успешно забронировали номер "${currentRoom.title}" в отеле "${currentHotel.title}"`,
            position: 'bottomCenter',
          });
          navigate(`/reservations?id=${userId}`)
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
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Забронировать номер</p>
        <p className="text-muted">Отель: {currentHotel.title}</p>
        <p className="text-muted">Номер: {currentRoom.title}</p>
        <Form className="mb-3" onSubmit={formHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Дата начала</Form.Label>
            <Form.Control type="date" className="mb-3" placeholder="Выберите дату" onChange={(e) => setDateStart(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Дата окончания</Form.Label>
            <Form.Control type="date" className="mb-3" placeholder="Выберите дату" onChange={(e) => setDateEnd(e.target.value)} required />
          </Form.Group>
          
          <Button variant="success" type="submit">
            Забронировать
          </Button>{' '}
          <Button variant="secondary" type="reset">
            Очистить
          </Button>
        </Form>
      </Container>
    </Container>
  )
}

export default ReservationsForm
