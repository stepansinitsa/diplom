import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetchData from "../../../api/useFetchData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setHotelsState } from "../../../store/hotels/hotelsSlice";
import LoaderMain from "../../Loader/LoaderMain";
import HotelRoomsList from "../HotelRooms/HotelRoomsList";
import HotelsListItem from "../HotelsList/HotelsListItem";
import { RootState } from "../../../store";

function HotelPageMain() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const role = useAppSelector((state: RootState) => state.user.role);  const hotelsState = useAppSelector((state: RootState) => state.hotels);  const { hotelsAPI } = useFetchData();  const location = useLocation();  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    setError(false);
    setLoading(true);

    if (!queryParams.get('id')) {
      navigate('/error');
      return;
    }

    const id: any = queryParams.get('id');

    hotelsAPI.findById(id)
      .then(result => {  
        dispatch(setHotelsState({ currentHotel: result.data }));
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
          position: 'bottomCenter',
        });
      });
  }, []);
  
  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3">
        <Container>
          <p className="fs-2 fw-semibold">Информация об отеле</p>
          {role === 'admin' &&
            <Link to={`/update-hotel`}>
              <Button variant="warning" className="me-1 mb-2">Редактировать</Button>
            </Link>
            
          }
        </Container>
      </Container>
      {loading ? (
        <LoaderMain />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке отеля!</p>
        ) : (
          <>
            <HotelsListItem hotel={hotelsState.currentHotel} showBtn={false} />
            {role === 'admin' &&
              <Link to={`/add-room?${hotelsState.currentHotel._id}`} className="ms-auto text-decoration-none">
                <div className="d-grid gap-2 mb-3">
                  <Button variant="success" size="lg">Добавить номер</Button>
                </div>
              </Link>
            }
            <HotelRoomsList />
          </>
        )
      )}
    </>
  )
}

export default HotelPageMain;
