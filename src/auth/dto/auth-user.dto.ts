import { ApiProperty } from '@nestjs/swagger'
import { IsPhoneNumber, IsString } from 'class-validator'

export class AuthUserDto {
  @ApiProperty({ description: 'User phone number' })
  @IsPhoneNumber('RU', { message: 'Введите номер телефона в формате +79000000000' })
  readonly phone: string

  @ApiProperty({ description: 'User password' })
  @IsString({ message: 'Не верный формат' })
  readonly password: string
}
