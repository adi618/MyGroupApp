import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserGroupMembership } from './UserGroupMembership';
import { Permission } from './Permission';
import { User } from './User';
import { Group } from './Group';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @OneToMany(() => UserGroupMembership, userGroupMembership => userGroupMembership.role)
    userGroupMembership: UserGroupMembership;

  @OneToMany(() => Permission, permissions => permissions.role)
    permissions: Permission[];

  @ManyToOne(() => User, user => user.rolesCreated)
  @JoinColumn({ name: 'created_by_user_id' })
    createdByUser: User;

  @ManyToOne(() => Group, group => group.roles)
  @JoinColumn({ name: 'group_id' })
    group: Group;
}
