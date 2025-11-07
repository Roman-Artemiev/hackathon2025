import { useEffect, useRef, useState } from "react";
import ChatGrid from "./ChatGrid";
import ChatHeading from "./ChatHeading";
import ChatSubHeading from "./ChatSubHeading";
import PromptBar from "../prompt/prompt-bar";
import QuestionFlow from "../prompt/QuestionFlow";
import type GridItem from "@/structures/GridItem";
import { Loader } from "lucide-react";
// import { jsPDF } from "jspdf";

interface QuestionType {
  id: string;
  field: string;
  question: string;
  type: "choice" | "number" | "text";
  options?: string[];
}

export default function Chat() {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ id: string; question?: string; answer: string }[]>([]);
  const [flowStarted, setFlowStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // keep answers referenced so linter doesn't flag it as unused
    // (we persist answers to localStorage when flow completes)
  }, [answers]);
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [gridItems]);

  const handleUserSend = async (text: string, customId?: number) => {
    if (!flowStarted) {
      // show user's message immediately
      setGridItems((prev) => [...prev, { text, author: 1 }]);

      setLoading(true);
      const id = customId ? customId : Math.floor(Math.random() * 1_000_000_000);
      try {
        const res = await fetch(
          "https://isakobe.app.n8n.cloud/webhook/f0fcf604-2400-4f51-8e62-34b3c779a990",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, message: text }),
          }
        );

        const data = await res.json();
        let parsed: QuestionType[] = [];
        if (Array.isArray(data)) parsed = data as QuestionType[];
        else if (Array.isArray(data?.questions)) parsed = data.questions as QuestionType[];
        else if (Array.isArray(data?.questions?.questions)) parsed = data.questions.questions as QuestionType[];

        if (parsed.length > 0) {
          setQuestions(parsed);
          // store the id we sent
          setTaskId(id);
          // append assistant's first question
          setGridItems((prev) => [...prev, { text: parsed[0].question, author: 0 }]);
          setFlowStarted(true);
          setCurrentQuestionIndex(0);
        }
      } catch (e) {
        console.warn("Webhook POST failed:", e);
      } finally {
        setLoading(false);
      }
    } else {
      // during normal chat, show message immediately
      setGridItems((prev) => [...prev, { text, author: 1 }]);
    }
  };

  // const generatePdf = () => {
  //   console.log("Generating PDF with answers:", answers);
  //   try {
  //     const doc = new jsPDF();
  //     doc.setFontSize(14);
  //     doc.text("Otázky a odpovědi", 14, 18);
  //     doc.setFontSize(11);
  //     let y = 28;
  //     if (answers.length === 0) {
  //       doc.text("Žádné odpovědi k uložení.", 14, y);
  //     } else {
  //       answers.forEach((a, i) => {
  //         const qText = a.question ? `${a.question}` : a.id;
  //         const line = `${i + 1}. ${qText}: ${a.answer}`;
  //         // split long lines roughly
  //         const maxWidth = 180;
  //         const split = doc.splitTextToSize(line, maxWidth);
  //         doc.text(split, 14, y);
  //         y += split.length * 7;
  //         if (y > 280) {
  //           doc.addPage();
  //           y = 20;
  //         }
  //       });
  //     }
  //     doc.save("answers.pdf");
  //   } catch (err) {
  //     console.warn("PDF generation failed:", err);
  //   }
  // };



  return (
    <div className="mb-20 w-full h-fit mx-auto max-w-4xl min-h-96">
      {/* <ChatHeading headningText="Zdravim" /> */}

      <div className="space-y-1 p-4 rounded-2xl bg-white mb-6 max-h-96 h-96 overflow-auto scrollbar" ref={chatContainerRef}>
        <ChatSubHeading text="Ahoj! Jsem tvůj asistent pro bezpečnost práce. Můžeš stručně říct, čím se zabýváš?" />

        <ChatGrid gridItems={gridItems ?? []} />
      </div>

      <div className='rounded-2xl '>
        {loading ? (
          <div className="p-4 text-center flex items-center gap-2 justify-center">
            <Loader className="animate-spin" />
            Přemýšlím…
          </div>
        ) : questions.length > 0 && flowStarted && currentQuestionIndex < questions.length ? (
          <QuestionFlow
            question={questions[currentQuestionIndex]}
            onSubmit={async (answer: string) => {
              const q = questions[currentQuestionIndex];

              // Add user message
              setGridItems((prev) => [...prev, { text: answer, author: 1 }]);

              const nextIndex = currentQuestionIndex + 1;

              // Build next answers synchronously so we can send immediately when finished
              const nextAnswers = [...answers, { id: q.id, question: q.question, answer }];
              setAnswers(nextAnswers);
              try {
                if (nextIndex >= questions.length) {
                  localStorage.setItem("questionAnswers", JSON.stringify(nextAnswers));
                }
              } catch (e) {
                console.warn("Could not persist answers to localStorage", e);
              }

              if (nextIndex < questions.length) {
                // show next assistant question
                setGridItems((prev) => [...prev, { text: questions[nextIndex].question, author: 0 }]);
                setCurrentQuestionIndex(nextIndex);
              } else {
                // finished - push final assistant confirmation message
                setGridItems((prev) => [
                  ...prev,
                  {
                    text: `Děkuji. Vaše odpovědi byly uloženy.

Základní informace
Místo výkonu práce: uvnitř haly

Pracovní činnost: elektroinstalace

Popis práce: chodit a kontrolovat kabely

Prostředí a souběžné činnosti: práce probíhá ve vnitřních prostorách haly

Kategorie práce: elektro

Doba trvání práce: 8 hodin

Počet pracovníků: 5 osob


Používané nástroje a prostředky
Nástroje a vybavení: kladivo

Materiály a látky: neuvedeno (žádné specifické nebezpečné látky)

Práce ve výšce: ne (0 m)

Přítomné energie: žádná


Povolení a ochranné pomůcky
Potřebná povolení: žádná

Osobní ochranné pracovní prostředky (OOPP):
Povinné: helma, rukavice
Doplňkové: dle potřeby izolační obuv


Hodnocení rizik
Nebezpečí: Úraz elektrickým proudem
Zdroj: Nevypnuté nebo neizolované kabely
Riziko: Zranění elektrickým proudem
Pravděpodobnost: 2
Závažnost: 3
Úroveň rizika: Střední
Opatření: Kontrola vypnutí energie před zahájením práce, použití izolovaných nástrojů
Povinné OOPP: Helma, rukavice
Doporučené OOPP: Izolační obuv


Doporučení a preventivní opatření
- Před zahájením prací vždy ověřit, že instalace je bez napětí.
- Používat pouze schválené a nepoškozené elektroinstalační nářadí.
- Zajistit, aby pracovníci byli seznámeni s postupy při práci na elektrických zařízeních.
- Zajistit, že pracovníci mají platné školení z BOZP a vyhlášku 50/1978 Sb.
- Udržovat pracovní prostor čistý a přehledný.


Shrnutí
Na základě provedeného hodnocení se jedná o střední úroveň rizika.
Při dodržení stanovených opatření a používání předepsaných OOPP je práce považována za bezpečnou.`,
                    author: 0
                  }

                ]);
                setCurrentQuestionIndex(nextIndex);
                setFlowStarted(false);

                // After finishing answers, POST only the taskId to the backend to request next steps
                // Show a small user-status message, then request next questions (if any).
                const idToSend = taskId;
                if (idToSend != null) {
                  // show a quick user status message before loading
                  setLoading(true);
                  try {
                    const resNext = await fetch(
                      "https://isakobe.app.n8n.cloud/webhook/f0fcf604-2400-4f51-8e62-34b3c779a990",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: idToSend }),
                      }
                    );
                    const dataNext = await resNext.json();
                    let parsedNext: QuestionType[] = [];
                    if (Array.isArray(dataNext)) parsedNext = dataNext as QuestionType[];
                    else if (Array.isArray(dataNext?.questions)) parsedNext = dataNext.questions as QuestionType[];
                    else if (Array.isArray(dataNext?.questions?.questions)) parsedNext = dataNext.questions.questions as QuestionType[];

                    if (parsedNext.length > 0) {
                      // continue the flow
                      setQuestions(parsedNext);
                      setGridItems((prev) => [...prev, { text: parsedNext[0].question, author: 0 }]);
                      setCurrentQuestionIndex(0);
                      setFlowStarted(true);
                    } else {
                      setShowSummary(true);
                    }
                  } catch (e) {
                    console.warn("Failed to POST taskId for next questions:", e);
                    setShowSummary(true);
                  } finally {
                    setLoading(false);
                  }
                } else {
                  setShowSummary(true);
                }
              }
            }}
          />
        ) : (
          <PromptBar setGridItems={setGridItems} gridItems={gridItems} onSend={handleUserSend} />
        )}


        {/* Generate PDF button shown when we have answers and the flow is not active */}
        {/* {!flowStarted && answers.length > 0 && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={generatePdf}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm"
            >
              Generovat PDF
            </button>
          </div>
        )} */}
      </div>
    </div>
  )
}
