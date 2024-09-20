import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Settings() {
    const { data: session } = useSession()

    const router = useRouter();
    async function logout() {
        await router.push("/")
        await signOut()
    }

    if (session?.user) {
        return (
            <>
                <header className="bg-indigo">
                    <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="text-center sm:text-left">
                                <div className="sm:flex sm:gap-4 flex gap-6 items-center">
                                    <div class="h-10 w-10">
                                        <img class="h-full w-full rounded-full object-cover object-center" src={session?.user?.image} alt="" />
                                    </div>

                                    <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                                        {session.user.name}
                                    </h1>
                                </div>
                                <p className="mt-1.5 px-4 marker:text-md text-gray-500 max-w-lg">
                                    {session.user.email}
                                </p>

                                <div className="block md:hidden">
                                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                        <svg
                                            xm lns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col items-center gap-4 sm:mt-0 sm-flex-row sm:items-center">

                                <button
                                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-600 px-5 py-3 text-green-700  font-medium transition hover:text-green-700 hover:bg-green-50 focus:outline-none focus:ring"
                                    type="button"
                                    onClick={logout}
                                >
                                    <span className="text-md font-medium">Logout</span>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg> */}

                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </>
        )
    }
    return (
        <div></div>
    )
}