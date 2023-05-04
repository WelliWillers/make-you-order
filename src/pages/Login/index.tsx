import { useAuth } from "../../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useLoader } from "../../hooks/useLoader";
import { CircleNotch } from "@phosphor-icons/react";

type LoginProps = {
  email: string;
  password: string;
};

const loginSchema = object({
  email: string().email('Este campo deve ser um e-mail válido').required('E-mail é um campo obrigatório'),
  password: string().required('Senha é um campo obrigatório'),
}).required();

export default function Login() {
  const { signIn } = useAuth();
  const { setLoading, show } = useLoader();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginProps> = async (values: LoginProps) => {
    setLoading(true)
    await signIn(values.email!, values.password!);
  };

  return (
    <div className="flex sm:min-w-full md:min-w-[30rem] min-h-[80vh] flex-col justify-center items-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-4xl text-center">LOGO</p>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
          Faça seu login para atender
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/*@ts-expect-error*/}
        <form className="space-y-2" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-50"
            >
              Seu E-mail
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register("email")}
                name="email"
                type="text"
                placeholder="Seu e-mail"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              <p className="text-blue-500 text-xs pt-1">
                {/*@ts-expect-error*/}
                {errors.email?.message}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-50"
              >
                Sua Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password")}
                name="password"
                type="password"
                placeholder="Sua senha"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              <p className="text-blue-500 text-xs pt-1">
                {/*@ts-expect-error*/}
                {errors.password?.message}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {
                show ? (<CircleNotch className="animate-spin" size={30} />) : 'Entrar'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
