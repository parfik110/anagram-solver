import ModalPortal from "./ModalPortal";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./GameOverModal.module.css";

/**
 * @file GameOverModal.jsx
 * @module GameOverModal
 * Modal component displayed when the game ends.
 */

/**
 * GameOverModal component
 *
 * @component
 * @param {"win"|"lose"|"time"} result - The result of the game
 * @param {string} word - The correct word
 * @param {boolean} hintUsed - Whether a hint was used
 * @param {function} onRepeat - Callback to restart the game
 * @returns {JSX.Element} The rendered modal
 */
function GameOverModal({ result, word, hintUsed, onRepeat }) {
  const navigate = useNavigate();
  const { uid } = useParams();

  const getTitle = () => {
    if (result === "win") return "✅ Перемога!";
    if (result === "lose") return "❌ Поразка!";
    if (result === "time") return "⏳ Час вийшов!";
    return "Гра завершена";
  };

  return (
    <ModalPortal>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.title}>{getTitle()}</h2>

          <p className={styles.word}>
            Правильне слово: <strong>{word}</strong>
          </p>

          {hintUsed && (
            <p className={styles.hint}>Підказка була використана</p>
          )}

          <div className={styles.buttons}>
            <button className={styles.button} onClick={onRepeat}>
              Повтор
            </button>

            <button
              className={styles.button}
              onClick={() => navigate(`/game/${uid}/start`)}
            >
              Головне меню
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

export default GameOverModal;
