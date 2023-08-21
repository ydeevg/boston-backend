import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'
import { Base } from 'src/utils/base'

@Entity('s_police')
export class SPolicyEntity extends Base {
  @ApiProperty({ description: 'Policy name' })
  @Column()
  name: string

  @ApiProperty({ description: 'Policy description' })
  @Column()
  description: string
}
