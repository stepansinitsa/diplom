import { useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import FormAuth from "./FormAuth";
import FormRegister from "./FormRegister";
import HeaderProfile from "./HeaderProfile";

function HeaderAuth() {
  const isAuth = useAuth();
  const [authForm, setAuthForm] = useState(true);

  return (
    <Container>
      {isAuth === true ? (
        <HeaderProfile />
      ) : (
        authForm === true ? (
          <>
            <FormAuth />
            <div>
              <small>
                Ещё не зарегистрированы? <p className="fw-bold" onClick={() => setAuthForm(!authForm)}>Регистрация</p>
              </small>
            </div>
          </>
        ) : (
          <>
            <FormRegister />
            <div>
              <small>
                Уже зарегистрированы? <p className="fw-bold" onClick={() => setAuthForm(!authForm)}>Авторизация</p>
              </small>
            </div>
          </>
        )
      )}
    </Container>
  )
}

export default HeaderAuth
