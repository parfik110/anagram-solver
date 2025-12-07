import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGameSettings, difficultyPresets } from "../context/GameSettingsContext";

const schema = yup.object().shape({
  difficulty: yup.string().oneOf(["easy", "medium", "hard"]).required(),
  attempts: yup.number().required(),
  time: yup.number().required(),
  hintsEnabled: yup.boolean()
});

function SettingsPage() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useGameSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: settings
  });

  const selectedDifficulty = watch("difficulty");

  useEffect(() => {
    const preset = difficultyPresets[selectedDifficulty];
    if (preset) {
      setValue("attempts", preset.attempts);
      setValue("time", preset.time);
      setValue("hintsEnabled", preset.hintsEnabled);
    }
  }, [selectedDifficulty, setValue]);

  const onSubmit = (data) => {
    updateSettings(data);
    navigate("/game");
  };

  return (
    <div>
      <h1>Налаштування гри</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Рівень складності */}
        <label>Рівень складності:</label>
        <select {...register("difficulty")}>
          <option value="easy">Легкий</option>
          <option value="medium">Середній</option>
          <option value="hard">Складний</option>
        </select>
        <p style={{ color: "red" }}>{errors.difficulty?.message}</p>

        {/* Кількість спроб */}
        <label>Кількість спроб:</label>
        <input type="number" {...register("attempts")} disabled />
        <p style={{ color: "red" }}>{errors.attempts?.message}</p>

        {/* Таймер */}
        <label>Час (секунди):</label>
        <input type="number" {...register("time")} disabled />
        <p style={{ color: "red" }}>{errors.time?.message}</p>

        {/* Підказки */}
        <label>
          <input type="checkbox" {...register("hintsEnabled")} disabled />
          Дозволити підказки
        </label>

        <button type="submit">Почати гру</button>
      </form>
    </div>
  );
}

export default SettingsPage;
