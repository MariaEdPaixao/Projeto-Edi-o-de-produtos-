import { TipoProduto } from "@/types";
import { promises as fs} from "fs";
import { NextResponse } from "next/server";

export async function GET(request:Request, {params}:{params:{id:number}}){

    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const produtos:TipoProduto[] = JSON.parse(file);

    const produto = produtos.find(p => p.id == params.id);
    return NextResponse.json(produto);
}

export async function PUT(request: Request, {params}: {params:{id:number}}){
    try{
        const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8') //caminho do bd
        const produtos:TipoProduto[] = JSON.parse(file)
        const index = produtos.findIndex(p => p.id == params.id)
        //findIndex retorna -1 quando não encontra o valor que queremos, buscamos um valor q não existe
        if(index != -1){
            const body = await request.json() // request é a requisão que esta chegando (nome, preço e estoque)
            produtos.splice(index, 1, body) //substituir 1 elemento com os valores novos
            await fs.writeFile(process.cwd() + '/src/data/base.json', JSON.stringify(produtos))
            return NextResponse.json({msg:'Produto atualizado com sucesso'}) //deixando uma mensagem
        }
    } catch(error){
        return NextResponse.json({msg: 'Erro ao atualizar produto' + error}, {status:500}) //erro no servidor
    }
}