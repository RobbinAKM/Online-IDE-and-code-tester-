import "./add-cell.css";
import { useAction } from "../hooks/use-actions";
interface addCellProps {
  id: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<addCellProps> = ({ id, forceVisible }) => {
  const { insert_cell_before } = useAction();
  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-button">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insert_cell_before(id, "code")}
        >
          Add Code
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insert_cell_before(id, "text")}
        >
          <span className="icon is-small">
            <i></i>
          </span>
          Add Text
        </button>
      </div>
    </div>
  );
};

export default AddCell;
