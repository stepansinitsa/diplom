import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SupportRequestData } from "../../types/interfaces";

interface propData {
  list: SupportRequestData[];
}

function SupportTable(data: propData) {
  const { list } = data;

  return (
    <Container>
      {list.length > 0 ? (
        <>
          <Table striped hover className="p-2 rounded text-center">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Почта</th>
                <th>Телефон</th>
                <th>Дата отправки</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {list.map(elem =>
                <tr key={elem._id}>
                  <td>{elem.userId.name}</td>
                  <td>{elem.userId.email}</td>
                  <td>{elem.userId.contactPhone}</td>
                  <td>{new Date(elem.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/chat?id=${elem._id}&email=${elem.userId.email}`} className="text-decoration-none">
                      <Button variant="warning" className="mb-1">Перейти</Button>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      ) : (
        <p className="text-muted text-center">Обращения отсутствуют!</p>
      )}
      
    </Container>
  )
}

export default SupportTable;
