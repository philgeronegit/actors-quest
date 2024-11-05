type HistoryProps = {
  history: string[];
};

const History = ({ history }: HistoryProps) => {
  return (
    <div>
      <h3 className="text-lg font-bold">Historique de recheche</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
