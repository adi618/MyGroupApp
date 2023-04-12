import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserGroupMembership } from './UserGroupMembership';
import { Role } from './Role';
import { Post } from './Post';
import { Friendship } from './Friendship';
import { Comment } from './Comment';
import { Reaction } from './Reaction';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source';

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

  @Column({ name: 'password', nullable: false })
    password: string;

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

  @BeforeInsert()
  hashPassword (): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  async updatePassword (newPassword: string): Promise<User> {
    this.password = bcrypt.hashSync(newPassword, 8);
    return await AppDataSource.manager.save(this);
  }

  checkIfPasswordMatch (unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
