import ModalPortal from "./ModalPortal";
import { useNavigate } from "react-router-dom";

function GameOverModal({ result, word, hintUsed }) {
  const navigate = useNavigate();

  const getTitle = () => {
    if (result === "win") return "✅ Перемога!";
    if (result === "lose") return "❌ Поразка!";
    if (result === "time") return "⏳ Час вийшов!";
    return "Гра завершена";
  };

  return (
    <ModalPortal>
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <h2>{getTitle()}</h2>

          <p>Правильне слово: <strong>{word}</strong></p>

          {hintUsed && <p style={{ color: "blue" }}>Підказка була використана</p>}

          <div style={styles.buttons}>
            <button onClick={() => navigate(0)}>Спробувати ще раз</button>
            <button onClick={() => navigate("/")}>Головне меню</button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center"
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between"
  }
};

export default GameOverModal;
