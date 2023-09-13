import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from 'src/user/entities/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity('token')
export class TokenEntity extends Base {
  @ApiProperty({ description: 'Owner token' })
  @ManyToOne(() => UserEntity)
  user: UserEntity

  @ApiProperty({ description: 'Refresh token' })
  @Column({ name: 'refresh_token' })
  refreshToken: string
}
