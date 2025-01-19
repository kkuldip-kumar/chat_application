import React, { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

const FormSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const SignUpForm: React.FC = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [_, startTransition] = useTransition();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const onSubmit: SubmitHandler<FormSchemaType> = (values) => {
        setError("");
        setSuccess("");
        console.log()
    };

    return (
        <div id="page-container" className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
            <main id="page-content" className="flex max-w-full flex-auto flex-col">
                <div className="relative mx-auto flex min-h-dvh w-full max-w-10xl items-center justify-center overflow-hidden p-4 lg:p-8">
                    <section className="w-full max-w-xl py-6">
                        <header className="mb-10 text-center">
                            <h1 className="mb-2 inline-flex items-center gap-2 text-2xl font-bold">
                                <svg className="hi-mini hi-cube-transparent inline-block size-5 text-blue-600 dark:text-blue-500"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd"
                                        d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
                                        clipRule="evenodd" />
                                </svg>
                                <span>Company</span>
                            </h1>
                            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Welcome, please sign in to your dashboard
                            </h2>
                        </header>
                        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
                            <div className="grow p-5 md:px-16 md:py-12">
                                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            {...register("name")}
                                            placeholder="Enter your name"
                                            className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                                        />
                                        {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            {...register("email")}
                                            placeholder="Enter your email"
                                            className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                                        />
                                        {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            {...register("password")}
                                            placeholder="Enter your password"
                                            className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                                        />
                                        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                                    </div>
                                    <div>

                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-6 py-3 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
                                        >
                                            <svg className="hi-mini hi-arrow-uturn-right inline-block size-5 opacity-50"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path
                                                    d="M10 2a.75.75 0 00-.75.75v7.89l-2.945-3.6a.75.75 0 00-1.152.96l4.25 5.2a.75.75 0 001.152 0l4.25-5.2a.75.75 0 00-1.152-.96L10.75 10.64V2.75A.75.75 0 0010 2z" />
                                                <path
                                                    d="M4 10a6 6 0 0111.46-2.598.75.75 0 101.358-.598A7.501 7.501 0 0010 1a7.5 7.5 0 00-7.5 7.5v10a.75.75 0 001.5 0V10z" />
                                            </svg>
                                            <span>Sign Up</span>
                                        </button>
                                        {error && <p className="mt-2 text-red-600">{error}</p>}
                                        {success && <p className="mt-2 text-green-600">{success}</p>}
                                    </div>
                                </form>
                            </div>
                            <div className="shrink-0 bg-gray-50 p-5 dark:bg-gray-900 dark:bg-opacity-50 md:px-16">
                                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                    Already Have Account <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300">Sign In here</Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
