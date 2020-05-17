import React, { useState } from "react"
import Button from "../core/Button";
import { PageType, PageKey } from ".";
import { useForm } from "react-hook-form"
import { signup } from '../helpers/auth'

// todo handle errors si sobra tiempo
function useSignup() {
  const [error, setError] = useState<boolean>(false)

  function doSignup ({ email, password }: FormProps) {
    setError(false)
    signup(email, password)
      .catch(() => setError(true))
  }

  return { error, doSignup }
}

type FormProps = {
  email: string,
  password: string
}

const Signup: React.FunctionComponent<PageType> = (props) => {
  const { register, handleSubmit } = useForm()
  const { doSignup, error } = useSignup()

  return (
    <div>
      <form onSubmit={handleSubmit(doSignup as any)}>
        <label>
          Correo
          <input name="email" ref={register({ required: true })} />
        </label>
        <label>
          Contraseña
          <input name="password" type="password" ref={register({ required: true })} />
        </label>
        <button type="submit">
          Crear cuenta
        </button>
      </form>

      {error && <span>TODO AGREGAR ERROR</span>}

      <p>¿Ya tienes una cuenta?</p>
      <p>
        <br></br>
      </p>
      <Button onClick={() => props.to(PageKey.Login)}>Login</Button>
    </div>
  );
};
//TODO: agregar feedback de que si se creó bien

export default Signup;
