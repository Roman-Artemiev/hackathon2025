import type GridItem from "@/structures/GridItem";

interface IChatGrid {
    gridItems: GridItem[];
}

export default function ChatGrid({ gridItems }: IChatGrid) {
    return (
        <div className="grid-cols-2 grid gap-1">
            {gridItems?.map((item, i) => (
                <div
                    key={i}
                    className={`max-w-[75%] py-2 px-3 rounded-xl text-sm leading-relaxed ${item.author === 0
                        ? "col-span-2 justify-self-start bg-gray-100 text-gray-800 rounded-bl-none"
                        : "col-span-2 justify-self-end bg-orange-100 text-gray-900 rounded-br-none text-right"
                        }`}
                >
                    {item.text}
                </div>
            ))}
        </div>
    );
}