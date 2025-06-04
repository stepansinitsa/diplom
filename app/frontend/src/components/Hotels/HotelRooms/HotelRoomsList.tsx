import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import useFetchData from "../../../api/useFetchData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setRoomsState } from "../../../store/rooms/roomsSlice";
import LoaderMain from "../../Loader/LoaderMain";
import HotelRoomsItems from "./HotelRoomsItems";

function HotelRoomsList() {
  const [error, setError] = useState<boolean>(false);
  const { roomsApi } = useFetchData();
  const roomsState = useAppSelector(state => state.rooms);
  const currentHotel = useAppSelector(state => state.hotels.currentHotel);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(false);

    dispatch(setRoomsState({ loading: true }));

    roomsApi.search({
      limit: roomsState.limit,
      offset: roomsState.offset,
      title: roomsState.titleSearch,
      hotel: currentHotel._id,
      isEnabled: true
    })
      .then(result => { 
        if (result.data.length > 0) {
          dispatch(setRoomsState({ list: result.data, loading: false }));
        } else {
          dispatch(setRoomsState({ offset: 0, loading: false, list: [] }));
        }
      })
      .catch(err => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
          position: 'bottomCenter',
        });
      });
  }, [roomsState.offset, roomsState.titleSearch]);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3 text-center">
        <Container>
          <p className="fs-4 fw-semibold">Список номеров</p>
        </Container>
      </Container>
      
      {roomsState.loading ? (
        <LoaderMain />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке списка номеров!</p>
        ) : (
          <HotelRoomsItems list={roomsState.list} />
        )
      )}
    </>
  )
}

export default HotelRoomsList;
