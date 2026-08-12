import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { Card } from "@/components/ui/card";

export function AuthShell({
  title,
  description,
  children,
  logoVariant = "drip",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  logoVariant?: "drip" | "gold";
}) {
  return (
    <section className="flex min-h-[80vh] items-center py-16">
      <Container className="flex justify-center">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex justify-center">
            <Logo variant={logoVariant} />
          </Link>
          <Card className="p-8">
            <h1 className="font-display text-2xl text-white">{title}</h1>
            <p className="mt-1 text-sm text-text-secondary">{description}</p>
            <div className="mt-6">{children}</div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
