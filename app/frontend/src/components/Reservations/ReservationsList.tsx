import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../api/useFetchData";
import { useAppSelector } from "../../store/hooks";
import LoaderMain from "../Loader/LoaderMain";
import ReservationsTable from "./ReservationsTable";

function ReservationsList() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<any>([]);
  const [reload, setReload] = useState<boolean>(false);
  const userId = useAppSelector(state => state.user.id);
  const queryParams = new URLSearchParams(location.search);
  const { reservationsApi } = useFetchData();
  const navigate = useNavigate();

  const handleDeleteReservation = (reservationId: string) => {
    try {
      reservationsApi.removeReservation(reservationId, userId)
        .then(() => {          
          iziToast.success({
            message: 'Вы успешно удалили бронь',
            position: 'bottomCenter',
          });
          setReload(!reload);
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

  useEffect(() => {
    setError(false);
    setLoading(true);

    if (!queryParams.get('id')) {
      navigate('/error');
      return;
    }

    const id: any = queryParams.get('id');

    reservationsApi.search({ userId: id })
      .then(result => {  
        setList(result.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
          position: 'bottomCenter',
        });
      });
  }, [reload]);

  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке броней пользователя!</p>
        ) : (
          <ReservationsTable list={list} handleDelete={handleDeleteReservation} />
        )
      )}
    </>
  )
}

export default ReservationsList