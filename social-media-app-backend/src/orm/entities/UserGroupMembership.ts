import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique, JoinColumn, Column, BeforeInsert } from 'typeorm';
import { User } from './User';
import { Group } from './Group';
import { Role } from './Role';

@Entity('user_group_membership')
@Unique('UQ_user_group', ['user', 'group'])
export class UserGroupMembership {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: false, name: 'interaction_points' })
    interactionPoints: number;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @ManyToOne(() => User, user => user.groupsJoined, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
    user: User;

  @ManyToOne(() => Group, group => group.members, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'group_id' })
    group: Group;

  @ManyToOne(() => Role, role => role.userGroupMembership)
  @JoinColumn({ name: 'role_id' })
    role: Role;

  @BeforeInsert()
  validateUserPresence (): void {
    if (typeof this.user.id === 'undefined') {
      throw new Error('Missing user in user-group membership');
    }
  }
}
