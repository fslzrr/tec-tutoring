import React, { useState } from "react"
import { Button, Text, Flex } from "rebass";
import { Label, Input } from "@rebass/forms"
import { useForm } from "react-hook-form"
import { signup } from '../helpers/auth'
import { useHistory } from "react-router";

// todo handle errors si sobra tiempo
function useSignup() {
  const [error, setError] = useState<boolean>(false)

  function doSignup({ email, password }: FormProps) {
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

const Signup = () => {
  const { register, handleSubmit } = useForm()
  const { doSignup, error } = useSignup()
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
      onSubmit={handleSubmit(doSignup as any)}>
        <Label mt={2} mb={2}>Correo</Label>
        <Input name="email" ref={register({ required: true })} />
        <Label mt={2} mb={2}>Contraseña</Label>
        <Input name="password" type="password" ref={register({ required: true })} />
        <Button mt={5} type="submit">Crear Cuenta</Button>
        {error && <span>TODO AGREGAR ERROR</span>}
        <Text m={3} textAlign="center">o</Text>
        <Button onClick={() => push('/login')}>Ir a iniciar sesión</Button>
    </Flex>
  );
};
//TODO: agregar feedback de que si se creó bien

export default Signup;
