import { Container, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setHotelsState } from "../../../store/hotels/hotelsSlice";
import { HotelRoomData } from "../../../types/interfaces";
import HotelRoomsItem from "./HotelRoomsItem";

interface propData {
  list: HotelRoomData[],
}

function HotelRoomsItems(data: propData) {
  const roomsState = useAppSelector(state => state.rooms);
  const dispatch = useAppDispatch();
  const { list } = data;

  const handleNextPage = async (data: string) => {
    try {
      if (data === 'plus') {
        dispatch(setHotelsState({ offset: roomsState.offset + roomsState.limit }));
      } else if (data === 'minus') {
        dispatch(setHotelsState({ offset: roomsState.offset - roomsState.limit }));
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      {list.length === 0 ? (
        <Container className="p-2 d-flex justify-content-center">
          <span>Комнаты для этого отеля отсутствуют!</span>
        </Container>
      ) : (
        <>
          {list.map(elem =>
            <HotelRoomsItem key={elem._id} room={elem} />
          )}
          <Pagination className="mt-3">
            {roomsState.offset > 0 && 
              <Pagination.Item onClick={() => handleNextPage('minus')}>
                Назад
              </Pagination.Item>
            }
            {roomsState.list.length >= roomsState.limit && 
              <Pagination.Item onClick={() => handleNextPage('plus')}>
                Дальше
              </Pagination.Item>
            }
          </Pagination>
        </>
        
      )}
      
    </>
  )
}

export default HotelRoomsItems