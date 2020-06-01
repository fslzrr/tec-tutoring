import { Input, Label } from "@rebass/forms";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button, Card, Flex, Text } from "rebass";
import { signup } from '../helpers/auth';

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
  const { register, handleSubmit } = useForm<FormProps>()
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
      onSubmit={handleSubmit(doSignup)}>
        {error &&
          <Card bg="red" color="#FFFFFF" p={2}>
            <Text textAlign="center">Este correo ya ha sido utilizado para otra cuenta o la contraseña que elegiste no es segura. </Text>
          </Card>
        }
        <Label mt={2} mb={2}>Correo</Label>
        <Input name="email" ref={register({ required: true })} />
        <Label mt={2} mb={2}>Contraseña</Label>
        <Input name="password" type="password" ref={register({ required: true })} />
        <Button mt={5} type="submit">Crear Cuenta</Button>
        <Text m={3} textAlign="center">o</Text>
        <Button onClick={() => push('/login')}>Ir a iniciar sesión</Button>
    </Flex>
  );
};

export default Signup;
