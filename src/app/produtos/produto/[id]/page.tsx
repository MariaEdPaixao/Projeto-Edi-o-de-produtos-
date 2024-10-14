"use client"

import { TipoProduto } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// dentro de params eu tenho um objeto que é do tipo id que é number
export default function Produto({params}:{params:{id: number}}){

    const navigate = useRouter()
    
    const [produto, setProduto] = useState<TipoProduto>({
        id: 0,
        nome: "",
        preco: 0,
        estoque: 0 
    })

    const id = params.id

    // Recuperando o produto da API através do ID
    useEffect(()=>{
        // async -> uma promessa que vai retornar algo q estou esperando
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:3000/api/base-produtos/${id}`)
            const data = await response.json()
            setProduto(data)
            // console.log(data)
        }
        chamadaApi()
    }, [id]) // quero que isso só seja carregado quando iniciar a página e não sempre
    //manipula um valor que nao está na lista de parametros


    // função para armazenar os dados digitados pelo usuário no obj produto 
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target //trazer os dados do evento
        setProduto({...produto, [name]:value})

    }

    // função para enviar os dados atualizados para a API
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try{
            const cabecalho = {
                method: 'PUT',
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(produto)
            }

            const response = await fetch(`http://localhost:3000/api/base-produtos/${id}`, cabecalho)
            if(response.ok){
                alert("Produto atualizado com sucesso!")
                setProduto({id: 0, nome: "", preco: 0, estoque: 0}) //limpando o form, opcional
                navigate.push('/produtos') //voltando p/ produtos
                
            }else{
                alert("Erro ao atualizar o produto!")
            }
        }catch(error){
            console.error("Erro ao atualizar o produto", error)
        }
    }
 
    return(
        <main className="grow">
            <h2 className="text-3xl text-center text-indigo-600 mb-4">Produto</h2>
        
                {/* esse id é possivelmente indefinido, então não temos a garantia que ele existe. Sabendo disso, posso colocar o "?" -> isso esta vindo de um outro lugar, pode ser que ele venha, pode ser que nao venha */}
               
            <form className="w-1/3 m-auto p-2 border border-indigo-950 rounded-md" onSubmit={handleSubmit}>
                <div className="flex flex-col p-2">
                    <label className="text-gray-700" htmlFor="idnome">Nome: </label>
                    <input className="border border-gray-700 p-1 rounded-md" type="text" name="nome" value={produto.nome} id="idnome" onChange={handleChange}/>
                </div>
                <div className="flex flex-col p-2">  
                    <label className="text-gray-700" htmlFor="idpreco">Preço: </label>
                    <input className="border border-gray-700 p-1 rounded-md" type="number" name="preco" step={'0.01'} value={produto.preco} id="idpreco" onChange={handleChange}/>
                </div>
                <div className="flex flex-col p-2">
                    <label className="text-gray-700" htmlFor="idestoque">Estoque: </label>
                    <input className="border border-gray-700 p-1 rounded-md" type="number" name="estoque" value={produto.estoque} id="idestoque" onChange={handleChange}/>
                </div>
                <button className="bg-green-700 text-white text-xl p-2 block ms-auto me-2 rounded-md" type="submit">Editar Produto</button>
            </form>
        </main>
    )
}