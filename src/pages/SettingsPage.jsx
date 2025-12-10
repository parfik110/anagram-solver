import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGameSettings } from "../context/GameSettingsContext";
import { difficultyPresets } from "../context/GameSettingsContext";
import styles from "./SettingsPage.module.css";

const schema = yup.object().shape({
  difficulty: yup.string().oneOf(["easy", "medium", "hard"]).required(),
  attempts: yup.number().required(),
  time: yup.number().required(),
  hintsEnabled: yup.boolean()
});

function SettingsPage() {
  const navigate = useNavigate();
  const { uid } = useParams();

  const { settings, updateSettings } = useGameSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: settings
  });

  useEffect(() => {
    reset(settings);
  }, [settings, reset]);

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
    navigate(`/game/${uid}/game`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Налаштування гри</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        
        <div>
          <label className={styles.label}>Рівень складності:</label>
          <select className={styles.select} {...register("difficulty")}>
            <option value="easy">Легкий</option>
            <option value="medium">Середній</option>
            <option value="hard">Складний</option>
          </select>
          <p className={styles.error}>{errors.difficulty?.message}</p>
        </div>

        <div>
          <label className={styles.label}>Кількість спроб:</label>
          <input className={styles.input} type="number" {...register("attempts")} disabled />
          <p className={styles.error}>{errors.attempts?.message}</p>
        </div>

        <div>
          <label className={styles.label}>Час (секунди):</label>
          <input className={styles.input} type="number" {...register("time")} disabled />
          <p className={styles.error}>{errors.time?.message}</p>
        </div>

        <label className={styles.checkbox}>
          <input type="checkbox" {...register("hintsEnabled")} disabled />
          Дозволити підказки
        </label>

        <button className={styles.button} type="submit">Почати гру</button>
      </form>
    </div>
  );
}

export default SettingsPage;
