import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./ResultPage.module.css";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { uid } = useParams();

  const { correct, originalWord } = location.state || {};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Результат</h1>

      {correct ? (
        <p className={`${styles.result} ${styles.correct}`}>
          ✅ Правильно! Слово: {originalWord}
        </p>
      ) : (
        <p className={`${styles.result} ${styles.wrong}`}>
          ❌ Неправильно. Правильне слово: {originalWord}
        </p>
      )}

      <button
        className={styles.button}
        onClick={() => navigate(`/${uid}/start`)}
      >
        На головну
      </button>
    </div>
  );
}

export default ResultPage;
