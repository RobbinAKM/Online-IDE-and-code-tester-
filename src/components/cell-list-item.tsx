import { Cell } from "../state";

interface cellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<cellListItemProps> = ({ cell }) => {
  return <div>{cell.id}</div>;
};

export default CellListItem;
