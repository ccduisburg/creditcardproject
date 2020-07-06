import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
//Base Entity helps us for Use.find() etc.. function
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  firstName: string;

  @Column("text")
  lastName: string;

  @Column("text")
  email: string;

  @Column("text", { nullable: true })
  stripeId: string;

  @Column("text", { default: "free-trial" })
  type: string;

  @Column("text")
  password: string;
}
