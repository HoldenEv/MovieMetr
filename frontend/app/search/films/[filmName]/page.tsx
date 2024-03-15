export default function Page({ params }: { params: { filmName: string } }) {
  const name = params.filmName;
  return <h1>{name}</h1>;
}
