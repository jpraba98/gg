import { Card } from "@/components/ui/card";
import type { PriceItem } from "@/data/services";

export function PriceList({ items }: { items: PriceItem[] }) {
  return (
    <Card className="divide-y divide-border p-0">
      {items.map((item) => (
        <div key={item.name} className="flex items-center justify-between px-6 py-4">
          <span className="text-sm text-white">{item.name}</span>
          <span className="text-sm font-semibold text-drip-500">{item.price}</span>
        </div>
      ))}
    </Card>
  );
}
