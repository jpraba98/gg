import { Container } from "@/components/shared/container";

export function CommunityStats({
  members,
  articlesPublished,
  eventsCovered,
}: {
  members: string;
  articlesPublished: number;
  eventsCovered: number;
}) {
  const stats = [
    { value: members, label: "Members" },
    { value: `${articlesPublished}+`, label: "Articles Published" },
    { value: `${eventsCovered}+`, label: "Events Covered" },
  ];

  return (
    <section className="border-y border-border bg-surface py-12">
      <Container className="grid grid-cols-3 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl text-white sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-text-secondary sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
