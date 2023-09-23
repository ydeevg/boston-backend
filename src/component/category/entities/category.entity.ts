import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { Base } from 'src/utils/base'
import { ApiProperty } from '@nestjs/swagger'
import { PointEntity } from 'src/point/entities/point.entity'
import { ComponentEntity } from 'src/component/entities/component.entity'

@Entity('component_category', { schema: 'public' })
export class ComponentCategoryEntity extends Base {
  @ApiProperty({ description: 'Component category name' })
  @Column({})
  name: string

  @ApiProperty({ description: '' })
  @ManyToOne(() => PointEntity)
  @JoinTable()
  point: PointEntity

  @ApiProperty({ description: 'components' })
  @ManyToMany(() => ComponentEntity)
  components: ComponentEntity[]

  // visible settings
}
