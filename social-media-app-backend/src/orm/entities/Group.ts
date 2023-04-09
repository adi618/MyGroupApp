import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserGroupMembership } from './UserGroupMembership';
import { Role } from './Role';
import { Post } from './Post';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: false })
    name: string;

  @Column({ type: 'text', nullable: true })
    description: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @OneToMany(() => UserGroupMembership, userGroupMembership => userGroupMembership.user)
    members: UserGroupMembership[];

  @OneToMany(() => Post, post => post.group)
    posts: Post[];

  @OneToMany(() => Role, role => role.group)
    roles: Group[];
}
