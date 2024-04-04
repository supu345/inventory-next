import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import {headers} from "next/headers";


// Invoice Create
export async function POST(req,res){

    try {
        let headerList=headers();
        let user_id=parseInt(headerList.get('id'));
        const prisma=new PrismaClient();
        let reqBody=await req.json();


        const result=await prisma.$transaction(async (tx)=>{

            // invoice
            let invoice=reqBody['invoice']
            invoice.user_id=user_id

            let createInvoice=await tx.invoices.create({
                data:invoice
            })

            let invoice_id=createInvoice.id;


            // invoice Product
            let products=reqBody['products']
            let invoiceProduct=[];

            products.map((item)=>{

                let eachProduct={
                    qty:item['qty'],
                    sale_price:item['sale_price'],
                    user_id:user_id,
                    product_id:item['product_id'],
                    invoice_id:invoice_id
                }
                invoiceProduct.push(eachProduct);
            })


            let createInvoiceProduct=await tx.invoice_products.createMany({
                data:invoiceProduct
            })

            return {createInvoice:createInvoice,createInvoiceProduct:createInvoiceProduct}

        })




        return NextResponse.json({status:"success",data:result})

    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }

}



// Invoice Select
export async function GET(req,res){

    try {
        let headerList=headers();
        let user_id=parseInt(headerList.get('id'));
        const prisma=new PrismaClient();

        const result=await prisma.invoices.findMany({
            where:{user_id:user_id},
            include:{
                customers:true,
                invoice_products:true
            }
        })

        return NextResponse.json({status:"success",data:result})

    }catch (e) {
        return NextResponse.json({status:"fail",data:e})
    }

}



    // Invoice Delete
    export async function DELETE(req,res){
        try {

            let headerList=headers();
            let user_id=parseInt(headerList.get('id'));
            const prisma=new PrismaClient();

            let {searchParams}=new URL(req.url);
            let id=parseInt(searchParams.get('id'))


            const result=await prisma.$transaction(async (tx)=>{

                const deleteProduct=await tx.invoice_products.deleteMany(
                    {
                        where:{
                            invoice_id:id,
                            user_id:user_id
                        }
                    }
                )

                const deleteInvoice=await tx.invoices.delete(
                    {
                        where:{
                            id:id,
                            user_id:user_id
                        }
                    }
                )

                return {deleteProduct:deleteProduct,deleteInvoice:deleteInvoice}


            })



            return NextResponse.json({status:"success",data:result})

        }catch (e) {
            return NextResponse.json({status:"fail",data:e})
        }

    }