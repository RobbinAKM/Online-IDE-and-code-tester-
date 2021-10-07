import { useAction } from "../hooks/use-actions";
import "./action-bar.css";

interface actionBarProps {
  id: string;
}

const ActionBar: React.FC<actionBarProps> = ({ id }) => {
  const { move_cell, delete_cell } = useAction();
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => move_cell(id, "up")}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => move_cell(id, "down")}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => delete_cell(id)}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
