import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserGroupMembership } from './UserGroupMembership';
import { Role } from './Role';
import { Post } from './Post';
import { Friendship } from './Friendship';
import { Comment } from './Comment';
import { Reaction } from './Reaction';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ name: 'first_name', nullable: false })
    firstName: string;

  @Column({ name: 'last_name', nullable: false })
    lastName: string;

  @Column({ unique: true, nullable: false })
    email: string;

  @Column({ name: 'date_of_birth', nullable: false })
    dateOfBirth: Date;

  @Column({ type: 'text', nullable: true })
    bio: string;

  @Column({ name: 'is_active', default: true, nullable: false })
    isActive: boolean;

  @Column({ name: 'password_hash', nullable: false })
    hashedPassword: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @OneToMany(() => UserGroupMembership, userGroupMembership => userGroupMembership.user)
    groupsJoined: UserGroupMembership[];

  @OneToMany(() => Role, role => role.createdByUser)
    rolesCreated: Role[];

  @OneToMany(() => Post, post => post.user)
    posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

  @OneToMany(() => Reaction, reaction => reaction.user)
    reactions: Reaction[];

  @OneToMany(() => Friendship, friendship => friendship.requester)
    sentFriendRequests: Friendship[];

  @OneToMany(() => Friendship, friendship => friendship.responder)
    receivedFriendRequests: Friendship[];

  @BeforeUpdate()
  hashPassword (): void {
    const hashedPassword = 'a';
    // const hashedPassword = hashMyPass(this.passwordHash)
    this.hashedPassword = hashedPassword;
  }
}
