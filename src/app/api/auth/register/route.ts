import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
     const { email, name, password } = await req.json();

     const existing = await prisma.user.findUnique({ where: { email } });
     if(existing){
          return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
     }

     const passwordHash = await bcrypt.hash(password, 12);

     const user = await prisma.user.create({
          data: {
               email,
               name,
               passwordHash,
               subscription: {
                    create: { plan: "free", status: "active"},
               },
          },
     });

     return NextResponse.json({ id: user.id, email: user.email });
}