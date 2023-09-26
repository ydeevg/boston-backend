import { ApiProperty } from '@nestjs/swagger'
import { Base } from 'src/utils/base'
import { Column, Entity } from 'typeorm'

@Entity('s_policy')
export class SPolicyEntity extends Base {
  @ApiProperty({ description: 'Policy name' })
  @Column()
  name: string

  @ApiProperty({ description: 'Policy description' })
  @Column()
  description: string
}
