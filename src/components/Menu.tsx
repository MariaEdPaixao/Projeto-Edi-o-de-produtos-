import Link from "next/link";

export default function Menu(){

    return(
        <nav className="flex">
            {/* gap-6 -> 24px | links -> classe que criei no tailwind*/}
            <ul className="flex gap-6 links">
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/produtos'}>Produtos</Link></li>
                <li><Link href={'/produtos/cad-produtos'}>Cadastro de Produtos</Link></li>
            </ul>
        </nav>
    )
}

