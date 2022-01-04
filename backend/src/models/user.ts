export class IUserDTO {
  name: string
  password: string
  email: string
}

export class IUser {
  readonly id: string
  name: string
  password?: string
  email: string
}

export class IProfileUpdateDTO {
  name?: string
  password?: string
  email?: string
}
