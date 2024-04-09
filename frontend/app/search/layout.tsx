import Search from "@/_ui/components/Search/Search";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(37, 57, 103, 0.854);",
          paddingTop: "5px",
          marginLeft: "-20px;",
          marginBottom: "10px",
        }}
      >
        <Search />
        <hr style={{ border: "0", height: "2px", background: "#333" }} />
      </div>

      <section>{children}</section>
    </>
  );
}
