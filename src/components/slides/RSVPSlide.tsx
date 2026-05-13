import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useForm,
  useFieldArray,
  Controller,
  type SubmitHandler,
} from "react-hook-form";
import { sendRSVP } from "@/lib/email";
import { WEDDING } from "@/lib/constants";
import ChapterHeader from "../ChapterHeader";
import FolkDivider from "../FolkDivider";
import type { RSVPForm, GuestForm, SlideProps, DrinkValue } from "@/types";

const MAX_GUESTS = 8;

const DRINK_OPTIONS: { value: DrinkValue; label: string }[] = [
  { value: "wine", label: "Вино" },
  { value: "vodka", label: "Водка" },
  { value: "cognac", label: "Коньяк" },
  { value: "whiskey", label: "Виски" },
  { value: "didrovka", label: "Дидровка" },
  { value: "nonalc", label: "Без алкоголя" },
];

const emptyGuest = (): GuestForm => ({
  name: "",
  guestType: "adult",
  attend: "yes",
  drinks: [],
  allergies: "none",
  allergyDetails: "",
  accommodation: "none",
  transfer: "none",
  transferAddress: "",
});

/* ── single guest sub-form ── */
interface GuestRowProps {
  index: number;
  control: ReturnType<typeof useForm<RSVPForm>>["control"];
  register: ReturnType<typeof useForm<RSVPForm>>["register"];
  watch: ReturnType<typeof useForm<RSVPForm>>["watch"];
  errors: ReturnType<typeof useForm<RSVPForm>>["formState"]["errors"];
  onRemove: () => void;
  canRemove: boolean;
}

function GuestRow({
  index,
  control,
  register,
  watch,
  errors,
  onRemove,
  canRemove,
}: GuestRowProps) {
  const guestType = watch(`guests.${index}.guestType`);
  const attend = watch(`guests.${index}.attend`);
  const allergies = watch(`guests.${index}.allergies`);
  const transfer = watch(`guests.${index}.transfer`);

  const isAdult = guestType === "adult";
  const attending = attend === "yes";

  const nameErr = errors.guests?.[index]?.name;
  const drinksErr = errors.guests?.[index]?.drinks;
  const allergyDetailErr = errors.guests?.[index]?.allergyDetails;
  const transferAddrErr = errors.guests?.[index]?.transferAddress;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="folk-card p-4 sm:p-5"
    >
      <div className="flex justify-between items-center mb-3.5">
        <span className="font-slav uppercase text-rose text-[16px] tracking-widest3">
          Гость {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-ink-muted hover:text-rose
                       w-8 h-8 -m-1 flex items-center justify-center
                       text-xl leading-none transition-colors"
            aria-label="Удалить гостя"
          >
            ×
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3.5">
        {/* Guest type */}
        <Controller
          control={control}
          name={`guests.${index}.guestType`}
          render={({ field }) => (
            <div>
              <label className="field-label">Тип гостя</label>
              <div className="flex gap-2.5">
                {[
                  { v: "adult" as const, l: "Взрослый" },
                  { v: "child" as const, l: "Ребёнок" },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.v}
                    onClick={() => field.onChange(opt.v)}
                    className={`toggle-btn ${
                      field.value === opt.v ? "active" : ""
                    }`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          )}
        />

        {/* Name */}
        <div>
          <label className="field-label">Имя и Фамилия</label>
          <input
            {...register(`guests.${index}.name`, {
              required: "Пожалуйста, укажите имя",
              minLength: { value: 2, message: "Пожалуйста, укажите имя" },
            })}
            className={`field-input ${nameErr ? "border-rose" : ""}`}
            placeholder="Иван Иванов"
            autoComplete="off"
          />
          {nameErr && (
            <p className="text-rose text-[11px] mt-1 font-slav">
              {nameErr.message as string}
            </p>
          )}
        </div>

        {/* Attendance */}
        <Controller
          control={control}
          name={`guests.${index}.attend`}
          render={({ field }) => (
            <div>
              <label className="field-label">
                Сможете присутствовать на торжестве?
              </label>
              <div className="flex gap-2.5">
                {[
                  { v: "yes" as const, l: "✓ С радостью!" },
                  { v: "no" as const, l: "✗ Не смогу" },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.v}
                    onClick={() => field.onChange(opt.v)}
                    className={`toggle-btn ${
                      field.value === opt.v ? "active" : ""
                    }`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          )}
        />

        <AnimatePresence initial={false}>
          {attending && (
            <motion.div
              key="attending-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden flex flex-col gap-3.5"
            >
              {/* Drinks — adults only */}
              {isAdult && (
                <Controller
                  control={control}
                  name={`guests.${index}.drinks`}
                  rules={{
                    validate: (v) =>
                      v.length > 0 || "Выберите хотя бы один напиток",
                  }}
                  render={({ field }) => (
                    <div>
                      <label className="field-label">
                        Что предпочитаете из напитков?
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {DRINK_OPTIONS.map((opt) => {
                          const active = field.value.includes(opt.value);
                          return (
                            <button
                              type="button"
                              key={opt.value}
                              onClick={() => {
                                const next = active
                                  ? field.value.filter((v) => v !== opt.value)
                                  : [...field.value, opt.value];
                                field.onChange(next);
                              }}
                              className={`chip-btn ${active ? "active" : ""}`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                      {drinksErr && (
                        <p className="text-rose text-[11px] mt-1 font-slav">
                          {drinksErr.message as string}
                        </p>
                      )}
                    </div>
                  )}
                />
              )}

              {/* Allergies */}
              <Controller
                control={control}
                name={`guests.${index}.allergies`}
                render={({ field }) => (
                  <div>
                    <label className="field-label">
                      Аллергии или ограничения в еде?
                    </label>
                    <div className="flex gap-2.5">
                      {[
                        { v: "none" as const, l: "Нет" },
                        { v: "yes" as const, l: "Да, есть" },
                      ].map((opt) => (
                        <button
                          type="button"
                          key={opt.v}
                          onClick={() => field.onChange(opt.v)}
                          className={`toggle-btn ${
                            field.value === opt.v ? "active" : ""
                          }`}
                        >
                          {opt.l}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              />

              <AnimatePresence initial={false}>
                {allergies === "yes" && (
                  <motion.div
                    key="allergy-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <input
                      {...register(`guests.${index}.allergyDetails`, {
                        validate: (v) =>
                          (v && v.trim().length > 0) ||
                          "Укажите аллергии или ограничения",
                      })}
                      className={`field-input ${
                        allergyDetailErr ? "border-rose" : ""
                      }`}
                      placeholder="Укажите аллергии или ограничения"
                    />
                    {allergyDetailErr && (
                      <p className="text-rose text-[11px] mt-1 font-slav">
                        {allergyDetailErr.message as string}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Accommodation — adults only */}
              {isAdult && (
                <Controller
                  control={control}
                  name={`guests.${index}.accommodation`}
                  render={({ field }) => (
                    <div>
                      <label className="field-label">
                        Необходимо ли вам проживание в городе Воронеж?
                      </label>
                      <div className="flex gap-2.5">
                        {[
                          { v: "none" as const, l: "Нет" },
                          { v: "yes" as const, l: "Да" },
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.v}
                            onClick={() => field.onChange(opt.v)}
                            className={`toggle-btn ${
                              field.value === opt.v ? "active" : ""
                            }`}
                          >
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                />
              )}

              {/* Transfer — adults only */}
              {isAdult && (
                <>
                  <Controller
                    control={control}
                    name={`guests.${index}.transfer`}
                    render={({ field }) => (
                      <div>
                        <label className="field-label">
                          Необходим ли вам трансфер после завершения
                          мероприятия?
                        </label>
                        <div className="flex gap-2.5">
                          {[
                            { v: "none" as const, l: "Нет" },
                            { v: "yes" as const, l: "Да" },
                          ].map((opt) => (
                            <button
                              type="button"
                              key={opt.v}
                              onClick={() => field.onChange(opt.v)}
                              className={`toggle-btn ${
                                field.value === opt.v ? "active" : ""
                              }`}
                            >
                              {opt.l}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  />

                  <AnimatePresence initial={false}>
                    {transfer === "yes" && (
                      <motion.div
                        key="transfer-address"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <input
                          {...register(`guests.${index}.transferAddress`, {
                            validate: (v) =>
                              (v && v.trim().length > 0) ||
                              "Укажите адрес для трансфера",
                          })}
                          className={`field-input ${
                            transferAddrErr ? "border-rose" : ""
                          }`}
                          placeholder="Укажите адрес назначения"
                        />
                        {transferAddrErr && (
                          <p className="text-rose text-[11px] mt-1 font-slav">
                            {transferAddrErr.message as string}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── main slide ── */
export default function RSVPSlide({ visible }: SlideProps) {
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RSVPForm>({
    defaultValues: { guests: [emptyGuest()] },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  const onSubmit: SubmitHandler<RSVPForm> = async (data) => {
    setSubmitState("sending");
    try {
      await sendRSVP(data.guests);
      setSubmitState("success");
    } catch (err) {
      console.error("RSVP send error:", err);
      setSubmitState("error");
    }
  };

  return (
    <section
      data-slide-index="6"
      className="slide-base above-paper !justify-start"
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[520px]"
      >
        <ChapterHeader chapter="Глава 6" title="Анкета" className="mb-7" />

        <p className="body-slav text-center text-pretty mb-7 max-w-md mx-auto">
          Дорогие наши гости, просим заполнить анкету после прочтения
          приглашения, чтобы мы смогли лучше подготовиться к нашему мероприятию.
        </p>

        <FolkDivider className="max-w-[220px] w-full mx-auto mb-6 opacity-80" />

        <AnimatePresence mode="wait">
          {submitState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="folk-card text-center py-12 px-7"
            >
              <p className="text-rose text-5xl mb-4 font-bukva">♥</p>
              <h3 className="font-bukva text-2xl sm:text-3xl text-rose mb-2">
                Спасибо!
              </h3>
              <p className="body-slav">
                Мы получили ваш ответ и очень ждём встречи!
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3.5"
              noValidate
            >
              <AnimatePresence initial={false}>
                {fields.map((field, index) => (
                  <GuestRow
                    key={field.id}
                    index={index}
                    control={control}
                    register={register}
                    watch={watch}
                    errors={errors}
                    onRemove={() => remove(index)}
                    canRemove={fields.length > 1}
                  />
                ))}
              </AnimatePresence>

              {fields.length < MAX_GUESTS && (
                <motion.button
                  type="button"
                  onClick={() => append(emptyGuest())}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 border border-dashed border-rose/40
                             font-slav uppercase text-[12px] tracking-widest3 text-ink-muted
                             hover:border-rose hover:text-rose transition-colors"
                >
                  + Добавить ещё гостя
                </motion.button>
              )}

              {submitState === "error" && (
                <p className="text-rose text-sm font-slav text-center">
                  Не удалось отправить. Попробуйте ещё раз.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={submitState === "sending"}
                whileHover={{ scale: submitState === "sending" ? 1 : 1.01 }}
                whileTap={{ scale: submitState === "sending" ? 1 : 0.98 }}
                className="btn-filled w-full mt-2"
              >
                {submitState === "sending"
                  ? "Отправляем..."
                  : "Отправить ответ"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
