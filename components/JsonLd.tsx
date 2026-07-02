// Renders a JSON-LD script tag. Server component; data is controlled (site
// constants + our own case-study data, no user input). `<` is still escaped to
// < so a stray "</script>" in any string can never break out of the tag.
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
