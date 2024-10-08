"use client"

import { TipoProduto } from "@/types"
import { useEffect, useState } from "react"

// dentro de params eu tenho um objeto que é do tipo id que é number
export default function Produto({params}:{params:{id: number}}){
    
    const [produto, setProduto] = useState<TipoProduto>()

    useEffect(()=>{
        // async -> uma promessa que vai retornar algo q estou esperando
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:3000/api/base-produtos/${params.id}`)
            const data = await response.json()
            setProduto(data)
            // console.log(data)
        }
        chamadaApi()
    }, []) // quero que isso só seja carregado quando iniciar a página e não sempre

    return(
        <main className="grow">
            <h2>Produto</h2>
            <div>
                {/* esse id é possivelmente indefinido, então não temos a garantia que ele existe. Sabendo disso, posso colocar o "?" -> isso esta vindo de um outro lugar, pode ser que ele venha, pode ser que nao venha */}
                <p>Id: {produto?.id}</p>
                <p>Nome: {produto?.nome}</p>
                <p>Preço: {produto?.preco}</p>
                <p>Estoque: {produto?.estoque}</p>
            </div>
        </main>
    )
}