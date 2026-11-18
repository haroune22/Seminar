"use client";

import { useActionState } from "react";
import { register, type RegisterState } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = [
  { label: "Student", value: "Student" },
  { label: "Teacher", value: "Teacher" },
];

const initialState: RegisterState = {};

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="text-sm text-red-600">{messages[0]}</p>;
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Kyle Crane"
          autoComplete="username"
          className="h-12 w-full border-zinc-700"
          required
        />
        <FieldError messages={state.errors?.username} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="kylecrane@gmail.com"
          autoComplete="email"
          className="h-12 w-full border-zinc-700"
          required
        />
        <FieldError messages={state.errors?.email} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          minLength={8}
          maxLength={72}
          className="h-12 w-full border-zinc-700"
          required
        />
        <FieldError messages={state.errors?.password} />
      </div>

      <div className="flex gap-4">
        <Label htmlFor="role">Role</Label>
        <Select name="role" required>
          <SelectTrigger
            className="border border-black text-zinc-900"
            id="role"
          >
            <SelectValue placeholder="Choose a role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError messages={state.errors?.role} />
      </div>

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <Button
        type="submit"
        className="py-6 text-lg"
        size="lg"
        disabled={pending}
      >
        {pending ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
