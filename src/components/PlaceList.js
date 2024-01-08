export function PlaceList({ places }) {
  if (!places || places.length === 0) {
    return <div>No Default Places!</div>;
  }

  return (
    <ul>
      {places.map((p) => (
        <li>{p.id}</li>
      ))}
    </ul>
  );
}
