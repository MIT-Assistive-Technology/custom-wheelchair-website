import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const measurements = pgTable("measurements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hipWidth: integer("hip_width"),
  shinLength: integer("shin_length"),
  measurement3: integer("measurement_3"),
  measurement4: integer("measurement_4"),
  measurement5: integer("measurement_5"),
  measurement6: integer("measurement_6"),
});

export const insertMeasurementSchema = createInsertSchema(measurements).omit({
  id: true,
});

export type InsertMeasurement = z.infer<typeof insertMeasurementSchema>;
export type Measurement = typeof measurements.$inferSelect;
