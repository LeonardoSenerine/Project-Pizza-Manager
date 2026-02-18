import { Link, useRouteError } from "react-router-dom";

export function Error() {
    const error = useRouteError() as Error
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-2" >
            <h1 className="text-4xl font-bold" >Woops, algo aconteceu...</h1>
            <p  >Um erro aconteceu na aplicação, abaixo voce encontra mais detalhes:</p>
            <pre>{error?.message || JSON.stringify(error)}</pre>
            <p>Voltar para o </p>
            <Link
                to="/" className="text-sky-600"
            >
                Dashboard
            </Link>

        </div >
    )
}