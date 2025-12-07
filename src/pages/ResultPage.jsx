import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { correct, originalWord } = location.state || {};

  return (
    <div>
      <h1>Результат</h1>

      {correct ? (
        <p>✅ Правильно! Слово: {originalWord}</p>
      ) : (
        <p>❌ Неправильно. Правильне слово: {originalWord}</p>
      )}

      <button onClick={() => navigate("/")}>На головну</button>
    </div>
  );
}

export default ResultPage;
