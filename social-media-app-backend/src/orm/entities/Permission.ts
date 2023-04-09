import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './Role';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: false })
    name: boolean;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @ManyToOne(() => Role, role => role.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
    role: Role;
}
