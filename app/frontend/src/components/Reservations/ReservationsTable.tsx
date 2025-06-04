import { Button, Container, Table } from "react-bootstrap";
import { ReservationData } from "../../types/interfaces";

interface propData {
  list: ReservationData[];
  handleDelete: Function;
}

function ReservationsTable(data: propData) {
  const { list, handleDelete } = data;

  return (
    <Container>
      {list.length > 0 ? (
        <>
          <p className="text-muted">Пользователь: {list[0].userId.email}</p>
          <Table striped hover className="p-2 rounded text-center">
            <thead>
              <tr>
                <th>Отель</th>
                <th>Номер</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {list.map(elem =>
                <tr key={elem._id}>
                  <td>{elem.hotelId.title}</td>
                  <td>{elem.roomId.title}</td>
                  <td>{new Date(elem.dateStart).toLocaleDateString()}</td>
                  <td>{new Date(elem.dateEnd).toLocaleDateString()}</td>
                  <td>
                    <Button variant="danger" className="mb-1" onClick={() => handleDelete(elem._id)}>Отменить</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      ) : (
        <p className="text-muted">Бронирования номеров отсутствуют!</p>
      )}
      
    </Container>
  )
}

export default ReservationsTable;
