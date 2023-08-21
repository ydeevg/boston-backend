import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: '+79519008568', description: 'Номер телефона' })
  @IsString({ message: 'Не верный формат' })
  @IsPhoneNumber('RU', { message: 'Некорректный номер телефона' })
  readonly phone: string

  @ApiProperty({ description: 'Пароль' })
  @IsString({ message: 'Не верный формат' })
  readonly password: string

  @ApiPropertyOptional({ description: 'Имя', required: false })
  @IsString({ message: 'Не верный формат' })
  @IsOptional()
  readonly name?: string
}
