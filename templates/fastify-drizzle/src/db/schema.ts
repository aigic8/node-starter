import { bigint, bigserial, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const UserKindEnum = pgEnum("user_kind", ["admin", "writer", "normal"])

// USERS ///////////////////////////////////////////////
export const UsersTable = pgTable("users", {
	id: bigserial("id", { mode: "bigint" }).primaryKey(),
	username: text("username").unique().notNull(),
	passwordHash: text("password_hash").notNull(),
	kind: UserKindEnum("kind").notNull().default("normal"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
export type User = typeof UsersTable.$inferSelect
export type NewUser = typeof UsersTable.$inferInsert

// POSTS ///////////////////////////////////////////////
export const PostsTable = pgTable("posts", {
	id: bigserial("id", { mode: "bigint" }).primaryKey(),
	title: text("title").notNull(),
	body: text("body").notNull(),
	authorId: bigint("author_id", { mode: "bigint" })
		.notNull()
		.references(() => UsersTable.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
export type Post = typeof PostsTable.$inferSelect
export type NewPost = typeof PostsTable.$inferInsert
