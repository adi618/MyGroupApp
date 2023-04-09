import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeInsert, Unique } from 'typeorm';
import { User } from './User';
import { Post } from './Post';

export enum ReactionType {
  LIKE = 'LIKE',
  LAUGHING = 'LAUGHING',
  BICEPS = 'BICEPS',
  HEART = 'HEART',
  DISLIKE = 'DISLIKE',
}

@Entity()
@Unique('UQ_reaction_user_post', ['user', 'post'])
export class Reaction {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'enum', enum: ReactionType, nullable: false })
    type: ReactionType;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @ManyToOne(() => User, user => user.reactions, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
    user: User;

  @ManyToOne(() => Post, post => post.reactions, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'group_id' })
    post: Post;

  @BeforeInsert()
  validateUserPresence (): void {
    if (typeof this.user.id === 'undefined') {
      throw new Error('Missing user');
    }
  }
}
