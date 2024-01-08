import Image from "next/image";
import logo from "@/assets/Images/logo.png";
import AuthForm from "@/components/forms/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          src={logo}
          height={56}
          width={56}
          className="mx-auto w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-zinc-900">
          Sign In to Your Account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
