import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCard = mutation({
    args: {
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
    },
    handler: async(ctx,args) => {
        const userId = await getAuthUserId(ctx)
        if(!userId){
            throw new Error('Unauthorized')
        }

        await ctx.db.insert("cards",{
            userId,
            fullName: args.fullName,
            jobTitle: args.jobTitle,
            company: args.company,
            phone: args.phone,
            email: args.email,
            website: args.website,
            address: args.address,
            twitter: args.twitter,
            linkedin: args.linkedin,
            github: args.github,
        })
    }
})

export const getCard = query({
    args: {},
    handler: async(ctx,args) => {
        const userId = await getAuthUserId(ctx)
        if(!userId){
            throw new Error('Unauthorized')
        }

        return await ctx.db.query("cards").collect()
    }
})