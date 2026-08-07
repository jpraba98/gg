import { Container } from "@/components/shared/container";

export function Mission() {
  return (
    <section className="border-t border-border py-24">
      <Container className="max-w-2xl text-center">
        <p className="section-label">Mission</p>
        <p className="mt-5 font-display text-2xl leading-snug text-white sm:text-3xl">
          &ldquo;We strive to provide a platform for Toronto culture — providing new unique
          services and opportunities that many do not have access to. We aspire to be a
          long-lasting community for the people of Toronto. Pushing positivity and creative
          influence.&rdquo;
        </p>
      </Container>
    </section>
  );
}
