import { ApiProperty } from "@nestjs/swagger";
import { Base } from "src/utils/base";
import { Column } from "typeorm";

export class SPolicyEntity extends Base {
  @ApiProperty({ description: "Policy name" })
  @Column()
  name: string

  @ApiProperty({ description: "Policy description" })
  @Column()
  description: string
}
