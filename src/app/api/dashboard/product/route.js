import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import {headers} from "next/headers";


// product Create
export async function POST(req,res){

    try {
        let headerList=headers();
        let user_id=parseInt(headerList.get('id'));
        const prisma=new PrismaClient();

        let reqBody=await req.json();
        reqBody.user_id=user_id

        const result=await prisma.products.create({
            data:reqBody
        })


        return NextResponse.json({status:"success",data:result})

    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }

}



// product Select
export async function GET(req,res){

    try {
        let headerList=headers();
        let user_id=parseInt(headerList.get('id'));
        const prisma=new PrismaClient();

        const result=await prisma.products.findMany({where:{user_id:user_id}})


        return NextResponse.json({status:"success",data:result})

    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }

}




//product Update
export async function PUT(req,res){

    try {

        let headerList=headers();
        let user_id=parseInt(headerList.get('id'));
        const prisma=new PrismaClient();

        let {searchParams}=new URL(req.url);
        let id=parseInt(searchParams.get('id'))

        let reqBody=await req.json();

        const result=await prisma.products.update({
            where:{id:id,user_id:user_id},
            data:reqBody
        })



        return NextResponse.json({status:"success",data:result})

    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }

}




// product Delete
export async function DELETE(req,res){
    try {

        let headerList=headers();
        let user_id=parseInt(headerList.get('id'));
        const prisma=new PrismaClient();

        let {searchParams}=new URL(req.url);
        let id=parseInt(searchParams.get('id'))


        const result=await prisma.products.delete({
            where:{id:id,user_id:user_id}
        })

        return NextResponse.json({status:"success",data:result})

    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }

}