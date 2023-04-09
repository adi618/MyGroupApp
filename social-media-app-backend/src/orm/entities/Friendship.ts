import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeInsert, Column } from 'typeorm';
import { User } from './User';

export enum FriendshipStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'enum',
    enum: FriendshipStatus,
    default: FriendshipStatus.PENDING
  })
    status: FriendshipStatus;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @ManyToOne(() => User, user => user.sentFriendRequests, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'requester_id' })
    requester: User;

  @ManyToOne(() => User, user => user.sentFriendRequests, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'responder_id' })
    responder: User;

  @BeforeInsert()
  validateUsersPresence (): void {
    if (typeof this.requester.id === 'undefined' || typeof this.responder.id === 'undefined') {
      throw new Error('A friendship must have both a requester and a responder');
    }
  }
}
