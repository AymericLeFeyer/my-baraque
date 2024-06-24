export default async function RoutePage({
  params,
}: {
  params: { projectId: string };
}) {
  return <p>{params.projectId}</p>;
}
