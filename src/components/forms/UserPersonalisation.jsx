import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import questions from "../../config/questions";



export default function UserPersonalisation() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const current = questions[step];

    const next = () => {
        if (step < questions.length - 1) {
            setStep((s) => s + 1);
        } else {
            console.log(answers);
        }
    };

    const prev = () => {
        if (step > 0) setStep((s) => s - 1);
    };

    const saveAnswer = (value) => {
        setAnswers({
            ...answers,
            [current.id]: value,
        });
    };

    return (
        <div className="flex h-screen items-center justify-center overflow-hidden bg-white/90 text-black">

            <div className="w-full max-w-3xl px-8">

                {/* Progress */}

                <div className="mb-10 h-2 rounded-full">
                    <div
                        className="h-full rounded-full bg-blue-500 duration-300"
                        style={{
                            width: `${((step + 1) / questions.length) * 100}%`,
                        }}
                    />
                </div>

                <AnimatePresence mode="wait">

                    <motion.div
                        key={step}
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -200, opacity: 0 }}
                        transition={{ duration: .35 }}
                    >
                        <h1 className="mb-8 text-4xl font-bold">
                            {current.question}
                        </h1>

                        {current.type === "radio" && (
                            <div className="space-y-4">

                                {current.options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => saveAnswer(option)}
                                        className={`w-full rounded-xl border p-5 text-left duration-200
                                        ${answers[current.id] === option
                                            ? "border-blue-300 bg-blue-500/20"
                                            : "border-black/30 hover:border-white"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}

                            </div>
                        )}

                        {current.type === "text" && (
                            <input
                                className="w-full rounded-xl bg-white/10 p-5 outline-none"
                                placeholder="Type here..."
                                value={answers[current.id] || ""}
                                onChange={(e) => saveAnswer(e.target.value)}
                            />
                        )}
                    </motion.div>

                </AnimatePresence>

                <div className="mt-12 flex justify-between">

                    <button
                        onClick={prev}
                        disabled={step === 0}
                        className="rounded-lg bg-white/10 px-6 py-3 disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <button
                        onClick={next}
                        className="rounded-lg bg-black/90 text-white px-8 py-3"
                    >
                        {step === questions.length - 1 ? "Finish" : "Next"}
                    </button>

                </div>

            </div>

        </div>
    );
}

