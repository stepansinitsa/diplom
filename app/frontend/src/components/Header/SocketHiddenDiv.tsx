import iziToast from "izitoast";
import { useSocket } from "../../hooks/useSocket";
import { useSocketEvent } from "../../hooks/useSocketEvent";
import { useSocketSubscribe } from "../../hooks/useSocketSubscribe";
import { SocketDto } from "../../types/interfaces";
import { useAppSelector } from "../../store/hooks";

function SocketHiddenDiv() {
  const user = useAppSelector((state: { user: any }) => state.user);  useSocket();
  useSocketSubscribe();
  const listener = (socketDto: SocketDto) => {
    if (user.id !== socketDto.author.id) {
      iziToast.info({
        message: `Новое сообщение от пользователя ${socketDto.author.name}`,
        position: 'bottomCenter',
      });
    }
  };
  useSocketEvent('subscribeToChat', listener);
  useSocketEvent('newMessage', listener);

  return (
    <></>
  )
}

export default SocketHiddenDiv;
