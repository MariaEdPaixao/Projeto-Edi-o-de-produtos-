import { TipoProduto } from "@/types";
import { promises as fs} from "fs";
import { NextResponse } from "next/server";

export async function GET(request:Request, {params}:{params:{id:number}}){

    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const produtos:TipoProduto[] = JSON.parse(file);

    const produto = produtos.find(p => p.id == params.id);
    return NextResponse.json(produto);
}

