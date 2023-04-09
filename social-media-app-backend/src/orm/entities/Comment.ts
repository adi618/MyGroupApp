import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'text', nullable: false })
    content: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @ManyToOne(() => User, user => user.comments, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
    user: User;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'group_id' })
    post: Post;

  @BeforeInsert()
  validateUserPresence (): void {
    if (typeof this.user.id === 'undefined') {
      throw new Error('Missing user');
    }
  }
}
