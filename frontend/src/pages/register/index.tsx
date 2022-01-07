import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Header, Input, Logo } from '../../components'
import { AuthContext } from '../../contexts/AuthContext'
import api from '../../services/api'
import { withSSRGuest } from '../../utils/withSSRGuest'

type RegisterFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const RegisterFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigátorio'),
  email: yup.string().required('E-mail obrigátorio').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigátoria')
    .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas não coincidem'),
})

export default function Register() {
  const toast = useToast()
  const router = useRouter()
  const { signIn } = useContext(AuthContext)
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(RegisterFormSchema),
  })

  const handleRegister: SubmitHandler<RegisterFormData> = async values => {
    try {
      await api.post('/register', values)

      toast({
        title: 'Usuário criado',
        status: 'success',
        isClosable: true,
        position: 'bottom-right',
      })

      await signIn({ email: values.email, password: values.password })

      return router.push('/home')
    } catch (error) {
      return toast({
        title: 'Erro ao criar usuário',
        description: error.response.data.error,
        status: 'error',
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right',
      })
    }
  }

  return (
    <Flex direction="column" h="100vh" justify="center">
      <Flex w="80%" my="6" maxWidth={1488} mx="auto" px="6">
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleRegister)}
        >
          <Flex mb="16" justify="center" align="center">
            <Logo />
          </Flex>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal" color="white">
              Cadastro
            </Heading>
          </Flex>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="name"
                label="Nome completo"
                error={formState.errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={formState.errors.email}
                {...register('email')}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={formState.errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={formState.errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/" passHref>
                <Button size="sm" fontSize="sm" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                isLoading={formState.isSubmitting}
              >
                Criar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async context => {
  return {
    props: {},
  }
})
