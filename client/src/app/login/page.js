"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const msgs = useRef(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://dummyjson.com/user/login", {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        console.log(response.data.token, ">> token");

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        router.push("/dashboard");
      }
      console.log(response.data, ">> login");
    } catch (error) {
      msgs.current.show({
        sticky: true,
        severity: "error",
        summary: "Error",
        detail: "Login gagal! Periksa username dan password Anda.",
        closable: false,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token, ">> udh login");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <Toast ref={msgs} />
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://iproc.id/assets/img/iproc-clean.png"
              className="w-32 mx-auto mt-10"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Masuk ke Platform iProc
            </h1>
            <p className="text-center mt-1 text-gray-500">
              Sistem modernisasi pengadaan barang dan jasa elektronik
            </p>
            <div className="w-full flex-1 mt-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto max-w-xs"
              >
                <input
                  className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${
                    errors.username ? "border-red-500" : ""
                  }`}
                  type="username"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs italic">
                    {errors.username.message}
                  </p>
                )}

                <input
                  className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password.message}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span className="ml-3">Login</span>
                </button>
              </form>
              <p className="mt-6 text-xs text-gray-600 text-center">
                Informasi iProc:{" "}
                <span className="text-blue-700 cursor-pointer">
                  helpdesk@adw.co.id
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
