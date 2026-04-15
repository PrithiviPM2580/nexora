"use client"

import React, { useState } from "react"
import { type SignInSchema, signInSchema, SignUpSchema } from "@/validator/auth"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  FieldError,
  FieldGroup,
  FieldLabel,
  Field,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RiLoader2Line } from "@remixicon/react"
import Link from "next/link"
import { useAuthToken } from "@/hooks/use-auth-token"

function SignInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setBearerToken } = useAuthToken()
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SignInSchema) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/home",
      },
      {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: (ctx) => {
          const token = ctx.response.headers.get("set-auth-token")
          if (token) setBearerToken(token)
          router.replace("/home")
          setIsLoading(false)
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
          setIsLoading(false)
        },
      }
    )
  }
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-0 bg-transparent! px-3 py-8">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Nexora AI account</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-8">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="john.doe@example.com"
                      autoComplete="off"
                      type="email"
                      className="py-5 focus-visible:border-primary focus-visible:ring-primary/30"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      autoComplete="off"
                      type="password"
                      className="py-5 focus-visible:border-primary focus-visible:ring-primary/30"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="mt-4 flex-col! gap-4">
          <Button
            type="submit"
            form="form-rhf-demo"
            className="w-full py-5"
            disabled={isLoading}
          >
            {isLoading && (
              <RiLoader2Line className="h-4 w-4 animate-spin bg-primary" />
            )}
            Sign In
          </Button>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignInForm
