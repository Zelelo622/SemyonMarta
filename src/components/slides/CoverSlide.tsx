import { useState } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import FolkDivider from "../FolkDivider";
import Balalaika from "../Balalaika";
import FolkFlower from "../FolkFlower";

interface Props {
  playing: boolean;
  loading: boolean;
  onMusicToggle: () => void;
}

export default function CoverSlide({
  playing,
  loading,
  onMusicToggle,
}: Props) {
  const [hasClickedMusic, setHasClickedMusic] = useState(false);

  const handleMusicToggle = () => {
    if (!hasClickedMusic) setHasClickedMusic(true);
    onMusicToggle();
  };

  return (
    <section data-slide-index="0" className="slide-base above-paper bg-ivory">
      {/* угловые орнаменты */}
      <FolkFlower
        className="absolute top-6 left-6 w-16 sm:w-24 opacity-70"
        color="#b32015"
      />
      <FolkFlower
        className="absolute top-6 right-6 w-16 sm:w-24 opacity-70"
        color="#b32015"
      />
      <FolkFlower
        className="absolute bottom-6 left-6 w-16 sm:w-24 opacity-70 rotate-180"
        color="#b32015"
      />
      <FolkFlower
        className="absolute bottom-6 right-6 w-16 sm:w-24 opacity-70 rotate-180"
        color="#b32015"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-col text-center relative"
      >
        {/* Жили-были */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.1 }}
          className="font-bukva text-rose leading-[0.95] text-balance"
          style={{ fontSize: "clamp(3.5rem, 14vw, 7rem)" }}
        >
          Жили-были
        </motion.h1>

        <FolkDivider className="max-w-[300px] w-full mx-auto my-6 sm:my-7" />

        {/* Имена */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.1 }}
          className="font-slav text-ink leading-[0.95] text-balance text-center"
          style={{ fontSize: "clamp(3.5rem, 14vw, 7rem)" }}
        >
          <div>{WEDDING.groomName}</div>
          <div className="text-rose -my-2 text-[0.7em]">да</div>
          <div>{WEDDING.brideName}</div>
        </motion.div>

        <FolkDivider className="max-w-[300px] w-full mx-auto my-6 sm:my-7" />

        {/* Текст-присказка */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="body-slav max-w-md mx-auto italic"
        >
          <span className="text-rose">Долго ль</span>, коротко ль, да свёл их путь сердечный и решили они сердца да
          руку друг другу вручить.
        </motion.p>

        {/* Дата */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1 }}
          className="mt-7 flex items-center justify-center gap-4 sm:gap-6"
        >
          <span className="font-bukva uppercase text-rose tracking-widest3 text-sm sm:text-base">
            {WEDDING.dateText}
          </span>
        </motion.div>

        {/* Балалайка — кнопка музыки */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <motion.button
            type="button"
            onClick={handleMusicToggle}
            disabled={loading}
            aria-label={
              loading
                ? "Загрузка…"
                : playing
                  ? "Остановить песнопения"
                  : "Включить песнопения"
            }
            className="relative cursor-pointer focus:outline-none disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.06 }}
            whileTap={{ scale: loading ? 1 : 0.94 }}
          >
            {/* Пульсирующее кольцо — подсказка до первого нажатия */}
            {!hasClickedMusic && !playing && (
              <>
                <motion.span
                  className="absolute rounded-full border-2 border-rose/50 pointer-events-none"
                  style={{ inset: "-14px" }}
                  animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    repeatDelay: 0.3,
                  }}
                />
                <motion.span
                  className="absolute rounded-full border border-rose/30 pointer-events-none"
                  style={{ inset: "-14px" }}
                  animate={{ scale: [1, 1.35], opacity: [0.4, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    repeatDelay: 0.3,
                    delay: 0.5,
                  }}
                />
              </>
            )}

            <Balalaika
              className={`w-20 sm:w-24 origin-top transition-opacity duration-300 ${
                playing ? "animate-sway" : ""
              } ${loading ? "opacity-50" : ""}`}
            />
          </motion.button>

        </motion.div>

        {/* стрелка-приглашение скроллить */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <span className="font-bukva uppercase text-[16px] tracking-widest3 text-ink-muted">
            Листайте далее
          </span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-rose"
          >
            <path d="M12 16L4 8h16z" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
