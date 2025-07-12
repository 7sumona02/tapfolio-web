import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
import { format } from "path";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  cards: defineTable({
    userId: v.id("users"),
    fullName: v.string(),
    jobTitle: v.string(),
    company: v.string(),
    phone: v.string(),
    email: v.string(),
    website: v.string(),
    address: v.string(),
    twitter: v.string(),
    linkedin: v.string(),
    github: v.string(),
  }),
  numbers: defineTable({
    value: v.number(),
  }),
   messages: defineTable({
    author: v.string(),
    body: v.string(),
    format: v.string()
  }),
});
