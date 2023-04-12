import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Comment } from '../entities/Comment';
import { Friendship } from '../entities/Friendship';
import { Group } from '../entities/Group';
import { Permission } from '../entities/Permission';
import { Post } from '../entities/Post';
import { Reaction } from '../entities/Reaction';
import { Role } from '../entities/Role';
import { User } from '../entities/User';
import { UserGroupMembership } from '../entities/UserGroupMembership';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Comment, Friendship, Group, Permission, Post, Reaction, Role, User, UserGroupMembership],
  migrations: ['src/orm/migrations/**/*.ts'],
  subscribers: ['src/orm/subscriber/**/*.ts']
});
