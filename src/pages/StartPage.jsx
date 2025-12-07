import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Старт гри</h1>
      <button onClick={() => navigate("/game")}>Почати</button>
    </div>
  );
}

export default StartPage;
