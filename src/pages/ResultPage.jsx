import { useSelector } from "react-redux";
import styles from "./ResultPage.module.css";

function ResultsPage() {
  const results = useSelector((state) => state.results);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Таблиця результатів</h1>

      {results.length === 0 ? (
        <p className={styles.empty}>Поки що немає результатів</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Слово</th>
              <th>Результат</th>
              <th>Підказка</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.word}</td>
                <td>{r.result}</td>
                <td>{r.hintUsed ? "Так" : "Ні"}</td>
                <td>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ResultsPage;
