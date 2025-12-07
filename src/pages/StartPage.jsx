import { useNavigate, useParams } from "react-router-dom";
import styles from "./StartPage.module.css";

function StartPage() {
  const navigate = useNavigate();
  const { uid } = useParams();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Старт гри</h1>

      <button
        className={styles.button}
        onClick={() => navigate(`/${uid}/game`)}
      >
        Почати
      </button>

      <button
        className={styles.button}
        onClick={() => navigate(`/${uid}/settings`)}
      >
        Налаштування
      </button>
      <button
        className={styles.button}
        onClick={() => navigate(`/${uid}/result`)}
      >
        Таблиця результатів
      </button>
    </div>
  );
}

export default StartPage;
