import { createFileRoute } from "@tanstack/react-router";
import { WHATSAPP } from "@/data/products";

const content: Record<string, { title: string; body: string[] }> = {
  delivery: {
    title: "Delivery Information",
    body: [
      "We deliver nationwide across South Africa via courier. Orders placed before 13:00 on a working day are dispatched the same day.",
      "Standard courier takes 2–4 working days and is free on orders over R1500. Express courier takes 1–2 working days at R160.",
      "Collection is available from our Durban CBD store: 320 Building, 4th Floor, Shop 423D, West Street.",
      "Tracking details are sent by SMS and email as soon as your parcel is scanned by the courier.",
    ],
  },
  returns: {
    title: "Returns Policy",
    body: [
      "Unworn items in original packaging may be returned within 14 days of delivery for an exchange or store credit.",
      "Sale items and headwear are final sale unless faulty.",
      "To start a return, message us on WhatsApp at " + WHATSAPP + " with your order number.",
      "Faulty items are replaced or refunded in full, including return shipping.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect only the information needed to process your order: name, contact details and delivery address.",
      "Your details are never sold or shared with third parties beyond our courier and payment partners.",
      "Newsletter subscribers can unsubscribe at any time using the link in every email.",
      "For any privacy request, contact us on " + WHATSAPP + ".",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      "By placing an order you confirm the details supplied are accurate and complete.",
      "Prices are shown in South African Rand and include VAT where applicable.",
      "Product colours may vary slightly between screens and garment dye batches.",
      "AnadaOne reserves the right to cancel and refund an order where stock is unavailable.",
    ],
  },
};

export const Route = createFileRoute("/policies/$slug")({
  loader: ({ params }) => content[params.slug] ?? content["terms"]!,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Policies"} — AnadaOne Clothing` },
      {
        name: "description",
        content: loaderData?.body?.[0] ?? "AnadaOne Clothing customer policies.",
      },
      { property: "og:title", content: `${loaderData?.title ?? "Policies"} — AnadaOne Clothing` },
      { property: "og:description", content: loaderData?.body?.[0] ?? "AnadaOne policies." },
    ],
  }),
  component: Policy,
});

function Policy() {
  const data = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-32 md:pt-44">
      <h1 className="display-xl text-[clamp(2rem,6vw,3.75rem)]">{data.title}</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        {data.body.map((p: string) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}
