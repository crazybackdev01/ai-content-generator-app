import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("User not authenticated", { status: 401 }); // Unauthorized
    }

    const { templateUsed, description, title } = await req.json();

    if (!templateUsed || !description || !title) {
      return new NextResponse("Bad request, All fields are necessary", {
        status: 400,
      });
    }

    const newHistoryDoc = await db.aIOutput.create({
      data: {
        userId: userId,
        title: title,
        description: description,
        templateUsed: templateUsed,
      },
    });

    revalidatePath("/");
    return NextResponse.json(newHistoryDoc, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("POST NEW DOC HISTORY ERROR", { status: 500 });
  }
}
