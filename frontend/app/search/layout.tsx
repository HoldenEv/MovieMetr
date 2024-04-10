import Search from "@/_ui/components/Search/Search";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Search />

      <section>{children}</section>
    </>
  );
}
