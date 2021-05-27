import {
  Entity,
  Column,
  FindManyOptions,
  getManager,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ length: 32 })
  username: string;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 128 })
  email: string;

  constructor(username: string, name: string, email: string) {
    this.username = username;
    this.name = name;
    this.email = email;
  }

  public async create() {
    return await getManager().save(this);
  }

  public async update(updates: object) {
    return await getManager().update(Users, this.id, updates);
  }

  public static async delete(id: number) {
    return await getManager().softDelete(Users, { id });
  }

  public static async retrieve(id: number) {
    return await getManager()
      .getRepository(Users)
      .findOne({ id, deletedAt: null });
  }

  public static async list(options?: FindManyOptions<Users>) {
    return await getManager()
      .getRepository(Users)
      .find({ ...options, deletedAt: null });
  }
}
