import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button, Flex, Text } from "rebass"
import { Label, Input } from "@rebass/forms"
import { login } from '../helpers/auth'
import { useHistory } from "react-router"


// todo handle errors si sobra tiempo
function useLogin() {
  const [error, setError] = useState<boolean>(false)

  function doLogin({ email, password }: FormProps) {
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
  const { push } = useHistory()

  return (
    <Flex
      flexDirection="column"
      as='form'
      bg=""
      mx="auto"
      maxWidth={500}
      mt={5}
      p={2}
      onSubmit={handleSubmit(doLogin as any)}>
        <Label mt={2} mb={2}>Correo</Label>
        <Input name="email" ref={register({ required: true })} />
        <Label mt={2} mb={2}>Contraseña</Label>
        <Input name="password" type="password" ref={register({ required: true })} />
        <Button mt={5} type="submit">Iniciar sesión</Button>
        {error && <span>TODO AGREGAR ERROR</span>}

        <Text m={3} textAlign="center">o</Text>
        <Button onClick={() => push("/signup")}>Crear una Cuenta</Button>
    </Flex>
  );
};

export default Login;
