import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Stack,
  Image
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Input, NavLink } from '../components'
import { AuthContext } from '../contexts/AuthContext'
import { withSSRGuest } from '../utils/withSSRGuest'
import { RiLoginBoxLine } from 'react-icons/ri'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigátorio').email('E-mail inválido'),
  password: yup.string().required('Senha obrigátoria'),
})

export default function Login() {
  const { signIn, errorMessage } = useContext(AuthContext)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  })

  const handleSignIn: SubmitHandler<SignInFormData> = async values => {
    await signIn(values)
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        maxWidth={420}
        bg='gray.800'
        p="10"
        w="100%"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
        <Image src="/logo.png" alt="anthorflix" width="270" height="79" mb="8"/>
          {errorMessage && (
            <Alert status="error" borderRadius="10">
              <AlertIcon />
              <AlertTitle mr={2} justify="center" align="center" fontSize="15">
                {errorMessage}
              </AlertTitle>
            </Alert>
          )}
          <Input
            name="email"
            label="E-mail"
            type="email"
            error={formState.errors.email}
            {...register('email')}
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            error={formState.errors.password}
            {...register('password')}
          />
        </Stack>
        <NavLink icon={RiLoginBoxLine} href='/register'>
          Não tem uma conta? Cadastre-se
        </NavLink>

        <Button
          type="submit"
          mt="6"
          colorScheme="green"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async context => {
  return {
    props: {},
  }
})
