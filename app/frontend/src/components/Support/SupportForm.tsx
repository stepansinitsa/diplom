import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useFetchData from "../../api/useFetchData";
import { useAppSelector } from "../../store/hooks";

function SupportForm() {
  const [text, setText] = useState<string>('');
  const userId = useAppSelector(state => state.user.id);
  const { supportRequestApi } = useFetchData();

  const formHandler = async (e: any) => {
    try {
      e.preventDefault();

      if (text.length > 1000) {
        iziToast.warning({
          message: 'Описание проблемы должно вмещать до 1000 символов!',
          position: 'bottomCenter',
        });
        return;
      }

      supportRequestApi.createRequest({ userId, text })
        .then(() => {          
          iziToast.success({
            message: 'Вы успешно создали обращение',
            position: 'bottomCenter',
          });
          window.location.reload();
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
    <Form className="mb-3" onSubmit={formHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Введите текст нового обращения</Form.Label>
        <Form.Control as="textarea" rows={3} className="mb-3" maxLength={1000} placeholder="Введите текст нового обращения" onChange={(e) => setText(e.target.value)} required />
      </Form.Group>
      
      <Button variant="success" type="submit">
        Создать обращение
      </Button>{' '}
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  )
}

export default SupportForm;
