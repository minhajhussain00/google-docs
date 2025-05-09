import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args:{paginationOpts:paginationOptsValidator,search:v.optional(v.string())},
  handler: async (ctx,args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("No user found");
    }
    const organizationId = (user.organization_id ?? undefined) 
    if(args.search && organizationId){
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title",(q)=>q.search("title",args.search).eq("organizationId",organizationId))
        .paginate(args.paginationOpts)
    }
    if (args.search?.trim()) {
      console.log("hi")
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", args.search).eq("ownerId", user.subject)
        )
        .paginate(args.paginationOpts);
    }

    if(organizationId){
      return await ctx.db.query("documents").withIndex("by_organization_id",(q)=>q.eq("organizationId",organizationId)).paginate(args.paginationOpts);
    }
    
      return await ctx.db.query("documents").withIndex("by_owner_id",(q)=>q.eq("ownerId",user.subject)).paginate(args.paginationOpts);
  
      
  },
});

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("No user found");
    }
    const organizationId = (user.organization_id ?? undefined) 
    
    const documentId = await ctx.db.insert("documents", {
      title: args.title || "Untitled document",
      ownerId: user.subject,
      organizationId,
      initialContent: args.initialContent || "",
    });
    return documentId;
  },
});

export const removeById = mutation({
  args:{id:v.id("documents")},
  handler: async (ctx,args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("No user found");
    }
    const document= ctx.db.get(args.id)
    if(!document){
      throw new ConvexError("No document found");
    }
    const organizationId = (user.organization_id ?? undefined) 
    const owner = (await document).ownerId === user.subject
    if(!owner && !organizationId){
      throw new ConvexError("Unauthorized");
    }
    return await ctx.db.delete(args.id)
  },
});
export const updateById = mutation({
  args:{id:v.id("documents"),title:v.string()},
  handler: async (ctx,args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("No user found");
    }
    const document= ctx.db.get(args.id)
    if(!document){
      throw new ConvexError("No document found");
    }
    const organizationId = (user.organization_id ?? undefined) 
    const owner = (await document).ownerId === user.subject
    if(!owner && !organizationId){
      throw new ConvexError("Unauthorized");
    }
    return await ctx.db.patch(args.id,{title:args.title})
  },
});
