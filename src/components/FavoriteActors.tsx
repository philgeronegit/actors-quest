const FavoriteActors = () => {
  const favoriteActors = [
    { id: 1, name: "Tom Hanks" },
    { id: 2, name: "Leonardo DiCaprio" },
    { id: 3, name: "Morgan Freeman" }
  ];
  return (
    <div>
      <h3 className="text-xl font-bold">Acteurs favoris</h3>
      <ul>
        {favoriteActors.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteActors;
