export default function Page({ params }: { params: { showName: string } }) {
  const name = params.showName;
  return <h1>{name}</h1>;
}
