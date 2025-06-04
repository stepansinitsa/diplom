import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../store/hooks";
import { setHotelsState } from "../../../store/hotels/hotelsSlice";

function HotelsSearchForm() {
  const [title, setTitle] = useState<string>('');
  const dispatch = useAppDispatch();

  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      dispatch(setHotelsState({ offset: 0, titleSearch: title }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={searchHandler}>
      <Form.Control type="text" className="mb-3" placeholder="Название отеля" onChange={(e) => setTitle(e.target.value)} />
      <Button variant="primary" type="submit">
        Найти
      </Button>
    </Form>
  )
}

export default HotelsSearchForm
