import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: '+79519008568', description: 'Phone number' })
  @IsString({ message: 'Не верный формат' })
  @IsPhoneNumber('RU', { message: 'Некорректный номер телефона' })
  readonly phone: string

  @ApiProperty({ description: 'Password' })
  @IsString({ message: 'Не верный формат' })
  readonly password: string

  @ApiPropertyOptional({ description: 'Name' })
  @IsString({ message: 'Не верный формат' })
  @IsOptional()
  readonly name: string

  @ApiPropertyOptional({ description: 'tenant' })
  @IsString({ message: 'Не верный формат' })
  @IsOptional()
  readonly tenant: string
}
