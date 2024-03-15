export default function Page({ params }: { params: { name: string } }) {
  const name = params.name;
  return <h1>{name}</h1>;
}
