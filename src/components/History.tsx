import { Card } from "flowbite-react";

type HistoryProps = {
  history: string[];
};

const History = ({ history }: HistoryProps) => {
  return (
    <Card href="#" className="cursor-default min-h-32">
      <h3 className="text-lg font-bold">Historique de recheche</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Card>
  );
};

export default History;
