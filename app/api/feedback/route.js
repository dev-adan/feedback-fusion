import { syncCurrentUser } from "@/lib/sync-user";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
        const dbUser = await syncCurrentUser();
        if(!dbUser){
            return NextResponse.json({error : "User not authenticated"}, {status : 401})
        }

        const body  = await request.json();
        const {title, description,category} = body;

        const post = await prisma.post.create({
            data : {
                title,
                description,
                category,
                authorId : dbUser.id
            }
        })

        return NextResponse.json(post);
    }catch(error){
        console.error("Error creating post:", error?.message || error);
        return NextResponse.json({error : "An error occurred while creating the post"}, {status : 500})
    }
}

export async function GET(request){
    try{
        const post  = await prisma.post.findMany({
            include : {
                author : true,
                votes : true
            },
            orderBy : {
                createdAt : "desc"
            }
        })
        return NextResponse.json(post);
    }catch(error){
        console.error("Error fetching posts:", error?.message || error);
        return NextResponse.json({error : "An error occurred while fetching posts"}, {status : 500})

    }
}