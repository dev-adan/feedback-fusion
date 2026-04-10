import {currentUser} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";


export async function syncCurrentUser(){
    try{
        const clerkUser = await currentUser();

        // No authenticated user - this is fine, just return null
        if(!clerkUser){
            return null
        }

        const email = clerkUser.emailAddresses[0]?.emailAddress;
        if(!email){
            console.warn("Clerk user has no email address:", clerkUser.id);
            return null;
        }

        let dbUser = await prisma.user.findUnique({
            where: { clerkUserId: clerkUser.id }
        });

        if(dbUser){
            // Update existing user
            dbUser = await prisma.user.update({
                where : {id : dbUser.id},
                data : {
                    email : email,
                    name : `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                    image : clerkUser.imageUrl
                }
            })
        }else {
            // Create new user
            const userCount = await prisma.user.count();
            const isFirstUser = userCount === 0;

            dbUser = await prisma.user.create({
                data: {
                    clerkUserId : clerkUser.id,
                    email,
                    name : `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                    image : clerkUser.imageUrl,
                    role : isFirstUser ? "ADMIN" : "USER"
                }
            });
            console.log('Created new user in DB:', dbUser);
        }

        return dbUser;
    }catch(error){
        // Handle Clerk API errors gracefully
        if(error?.message?.includes('Not Found') || error?.status === 404){
            console.warn("Clerk user not found - session may be stale. User should re-authenticate.");
            return null;
        }
        
        // Log other errors but don't crash the app
        console.error("Error syncing user:", error?.message || error);
        return null;
    }
} 