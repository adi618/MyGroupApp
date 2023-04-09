import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, BeforeInsert, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Group } from './Group';
import { Comment } from './Comment';
import { Reaction } from './Reaction';

export enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  FRIENDS = 'FRIENDS',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'text', nullable: false })
    content: string;

  @Column({
    type: 'enum',
    enum: Visibility,
    nullable: true
  })
    visibility: Visibility;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
    user: User;

  @ManyToOne(() => Group, group => group.posts)
  @JoinColumn({ name: 'group_id' })
    group: Group;

  @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

  @OneToMany(() => Reaction, reaction => reaction.post)
    reactions: Reaction[];

  @BeforeInsert()
  validateVisibility (): void { // a post must have a visibility if it does not belong to a group
    if (typeof this.group.id === 'undefined' && this.visibility === null) {
      throw new Error('Missing visibility field');
    } else if (typeof this.group.id !== 'undefined' && this.visibility !== null) { // a post must not have a visibility if it belongs to a group
      throw new Error('Cannot set visibility for posts that belog to a group');
    }
  }
}
