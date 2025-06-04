import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface propData {
  handleSendMessage: Function;
}

function ChatForm(data: propData) {
  const { handleSendMessage } = data;
  const [text, setText] = useState<string>();

  return (
    <Form>
      <Form.Control
        className="mb-2"
        placeholder="Введите сообщение"
        aria-label="Введите сообщение"
        aria-describedby="chat-send-message"
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Button id="chat-send-message mt-1" onClick={() => handleSendMessage(text)} type="reset">
        Отправить
      </Button>
    </Form>
  )
}

export default ChatForm;
