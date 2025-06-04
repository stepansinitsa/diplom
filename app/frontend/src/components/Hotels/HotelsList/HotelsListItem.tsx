import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HotelData } from "../../../types/interfaces";
import HotelsListItemImgs from "./HotelsListItemImgs";

function HotelsListItem({ hotel, showBtn }: { hotel: HotelData, showBtn: boolean }) {  
  return (
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container>
        <Row className="mt-2">
          <Col>
            <HotelsListItemImgs images={hotel.images} />
          </Col>
          <Col>
            <p className="fs-3 text-uppercase">{hotel.title}</p>
            <p className="text-muted">{hotel.description}</p>
            
            {showBtn === true &&
              <Link to={`/hotel?id=${hotel._id}`} className="text-decoration-none">
                <Button className="mb-2">Подробнее</Button>
              </Link>
            }
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default HotelsListItem