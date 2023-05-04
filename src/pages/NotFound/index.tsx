
export default function NotFound(){
    return (
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-3xl font-semibold text-blue-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-50 sm:text-5xl">
            Página não encontrada
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-100">
            Sinto muito, mas esta página não foi encontrada
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Voltar para o início
            </a>
            <a href="#" className="text-sm font-semibold text-gray-100">
              Contatar suporte <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    );
}