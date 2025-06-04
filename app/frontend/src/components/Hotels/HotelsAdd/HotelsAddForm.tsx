import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../api/useFetchData";

function HotelsAddForm() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<any>();
  const { hotelsAPI } = useFetchData();
  const navigate = useNavigate();

  const formHandler = async (e: any) => {
    try {
      e.preventDefault();

      if (title.length < 5 && title.length > 50) {
        iziToast.warning({
          message: 'Название отеля должно содержать от 5 до 50 символов!',
          position: 'bottomCenter',
        });
        return;
      }

      if (description.length > 0 && (description.length < 100 || description.length > 5000)) {
        iziToast.warning({
          message: 'Описание отеля должно содержать от 100 до 5000 символов!',
          position: 'bottomCenter',
        });
        return;
      }

      if (Object.keys(images).length > 10) {
        iziToast.warning({
          message: 'Максимально можно загрузить до 10 картинок!',
          position: 'bottomCenter',
        });
        return;
      }

      let isExtValid = true;
      if (Object.keys(images).length > 0) {
        for (const key in images) {
          if (Object.prototype.hasOwnProperty.call(images, key)) {
            const image = images[key];
            if (!image.type.includes('image')) {
              isExtValid = false;
              break;
            }
          }
        }
      }
      
      if (!isExtValid) {
        iziToast.warning({
          message: 'Можно загружать только картинки!',
          position: 'bottomCenter',
        });
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      for (const key in images) {
        if (Object.prototype.hasOwnProperty.call(images, key)) {
          const image = images[key];
          formData.append('images', image);
        }
      }

      hotelsAPI.addHotel(formData)
        .then(result => {
          iziToast.success({
            message: `Гостиница ${result.data.title} успешно добавлена`,
            position: 'bottomCenter',
          });

          navigate('/all-hotels');
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
        <Form.Label>Название отеля</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите название отеля" onChange={(e) => setTitle(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Описание (необязательно, не больше 5000 символов)</Form.Label>
        <Form.Control as="textarea" rows={3} className="mb-3" maxLength={5000} placeholder="Введите описание отеля" onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Выберите фотографии отеля для загрузки (не больше 10)</Form.Label>
        <Form.Control type="file" multiple accept="image/*" onChange={(e: any) => setImages(e.target.files)}/>
      </Form.Group>
      
      <Button variant="success" type="submit">
        Создать
      </Button>{' '}
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  )
}

export default HotelsAddForm
