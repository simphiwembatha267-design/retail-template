import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — AnadaOne Clothing" },
      { name: "description", content: "Sign in to track AnadaOne orders, saved pieces and delivery details." },
      { property: "og:title", content: "Account — AnadaOne Clothing" },
      { property: "og:description", content: "Track orders and saved pieces." },
    ],
  }),
  component: Account,
});

function Account() {
  const [mode, setMode] = useState<"in" | "up">("in");

  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-36 md:pt-48">
      <h1 className="display-xl text-center text-[clamp(2rem,6vw,3.5rem)]">
        {mode === "in" ? "Sign in" : "Create account"}
      </h1>
      <div className="mt-8 flex rounded-full border border-border p-1">
        {(["in", "up"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "h-11 flex-1 rounded-full text-[11px] uppercase tracking-[0.18em] transition-colors",
              mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {m === "in" ? "Sign in" : "Register"}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast("Accounts coming soon", {
            description: "Enable the backend to activate customer logins and order history.",
          });
        }}
        className="mt-8 grid gap-4"
      >
        {mode === "up" && <Input label="Full name" type="text" />}
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        <button
          type="submit"
          className="h-14 rounded-full bg-primary text-[11px] uppercase tracking-[0.24em] text-primary-foreground"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

function Input({ label, type }: { label: string; type: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <input
        type={type}
        required
        className="h-13 rounded-full border border-border bg-transparent px-5 py-3 text-sm outline-none focus:border-foreground"
      />
    </label>
  );
}
