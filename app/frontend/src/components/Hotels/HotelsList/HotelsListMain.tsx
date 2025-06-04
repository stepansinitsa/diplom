import { useEffect } from "react"
import { Button, Container, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setHotelsState } from "../../../store/hotels/hotelsSlice"
import HotelsList from "./HotelsList"

function HotelsListMain() {
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.user.role)
  
  useEffect(() => {
    dispatch(setHotelsState({ offset: 0, titleSearch: '' }));
  }, []);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3">
        <Container>
          <Stack direction="horizontal" gap={2}>
            <p className="fs-2 fw-semibold">Все гостиницы</p>
            {role === 'admin' &&
              <Link to={'/add-hotel'} className="ms-auto">
                <Button variant="success">Добавить гостиницу</Button>
              </Link>
            }
          </Stack>
        </Container>
      </Container>
      <HotelsList />
    </>
    
  )
}

export default HotelsListMain