import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cell: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderCellLists = cells.map((cell) => (
    <div key={cell.id}>
      <AddCell forceVisible={false} id={cell.id} />
      <CellListItem cell={cell} />
    </div>
  ));
  return (
    <div>
      {renderCellLists}
      <AddCell forceVisible={cells.length === 0} id={null} />
    </div>
  );
};

export default CellList;
