import {currentUser} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";


export async function syncCurrentUser(){
    try{
        const clerkUser = await currentUser();

        if(!clerkUser){
            return null
        }

        const email = clerkUser.emailAddresses[0]?.emailAddress;
        if(!email){
            throw new Error("User does not have an email address");
        }

        let dbUser = await prisma.user.findUnique({
            where: { clerkUserId: clerkUser.id }
        });

        if(dbUser){
            prisma.user.update({
                where : {id : dbUser.id},
                update : {
                    email : email,
                    name : `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                    image : clerkImage.imageUrl
                }
        })
        }else {
            const userCount = await prisma.user.count();
            const isFirstUser = userCount === 0;

            dbUser = await prisma.user.create({
                clerkUserId : clerkUser.id,
                email,
                name : `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                image : clerkUser.profileImageUrl,
                role : isFirstUser ? "ADMIN" : "USER"
            });
            console.log('Created new user in DB:', dbUser);
        }

        return dbUser;
    }catch(error){
        console.error("Error syncing user:", error);
        throw error;
    }
} 