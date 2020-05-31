import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Box, Button } from "rebass"
import { login } from '../helpers/auth'


// todo handle errors si sobra tiempo
function useLogin() {
  const [error, setError] = useState<boolean>(false)

  function doLogin ({ email, password }: FormProps) {
    setError(false)
    login(email, password)
      .catch(() => setError(true))
  }

  return { error, doLogin }
}

type FormProps = {
  email: string,
  password: string
}

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { doLogin, error } = useLogin()

  return (
    <Box bg="">
      <form onSubmit={handleSubmit(doLogin as any)}>
        <label>
          Correo
          <input name="email" ref={register({ required: true })} />
        </label>
        <label>
          Contraseña
          <input name="password" type="password" ref={register({ required: true })} />
        </label>
        <button type="submit">
          Iniciar sesión
        </button>
      </form>
      {error && <span>TODO AGREGAR ERROR</span>}

      <p>Don't have an account?</p>
      <p>
        <br></br>
      </p>
      <Button>Signup</Button>
    </Box>
  );
};

export default Login;
