import { Input, Label } from "@rebass/forms"
import React, {  } from "react"
import { useForm } from "react-hook-form"
import { Button, Flex } from "rebass"
import { useCurrentUser } from "../helpers/users"
import { UserCollection } from "../data/collections";
import { User } from "../models/User";

function UpdateDisplayName() {

  function UpdateNameStudent({ dpName }: FormProps, currentUser: any) {
    return UserCollection.doc(currentUser!.uid).update({
      student: currentUser?.uid,
      displayName: dpName,
      type: currentUser?.type
    } as Partial<User>)
  }

  return { UpdateNameStudent}
}

type FormProps = {
  dpName: string
}

const Info = () => {
  const currentUser = useCurrentUser()
  console.log(currentUser);
  const { register, handleSubmit } = useForm<FormProps>()
  const { UpdateNameStudent } = UpdateDisplayName()

  return (
    <Flex
      flexDirection="column"
      as='form'
      bg=""
      mx="auto"
      maxWidth={500}
      mt={5}
      p={2}
      onSubmit={handleSubmit((value) => UpdateNameStudent(value, currentUser))}>
        <Label mt={2} mb={2}>ID: {currentUser?.uid}</Label>
        <Label mt={2} mb={2}>tipo de usuario: {currentUser?.type}</Label>
        <Label mt={2} mb={2}>Nombre: {currentUser?.displayName}</Label>
        <Input name="dpName" ref={register({ required: true })} />
        <Button mt={5} type="submit">Cambiar nombre</Button>
    </Flex>
  );      
};

export default Info;
