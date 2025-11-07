import { useState } from "react";
import { Button } from '@/components/ui'
import { Input } from '@/components/ui/input'

interface QuestionType {
  id: string;
  field: string;
  question: string;
  // backend uses 'choice' | 'number' | 'text'
  type: "choice" | "number" | "text";
  options?: string[];
}

interface Props {
  question: QuestionType;
  onSubmit: (answer: string) => void;
}

export default function QuestionFlow({ question, onSubmit }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    // basic validation
    if ((question.type === "text" || question.type === "choice") && value.trim() === "") return;
    if (question.type === "number" && value === "") return;
    onSubmit(value);
    setValue("");
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <div className="w-full">
        {question.type === "text" && (
          <Input
            className="w-full bg-white"
            placeholder={question.question}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          />
        )}

        {question.type === "number" && (
          <Input
            className="w-full bg-white"
            placeholder={question.question}
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          />
        )}

        {question.type === "choice" && (
          <div>
            {question.options ? <p className="mb-2 text-sm font-medium">{question.question}</p> : null}
            <div className="flex gap-2 flex-wrap">
              {(question.options || []).map((opt) => (
                <label key={opt} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name={question.id}
                    value={opt}
                    checked={value === opt}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-28">
        Další
      </Button>
    </form>
  );
}
