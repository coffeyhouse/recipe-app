import React from "react";
import Card from "./Card";
import { FaPlus, FaPen } from "react-icons/fa";

export default function MealCard({ mealType, meal, side, color, source, icon }) {
    const randomImageNumber = Math.floor(Math.random() * 1000);

    return (
        <div className="flex flex-col gap-2">
            {mealType && (
                <p className="font-bold flex flex-col text-sm">
                    {mealType} <span className={`h-[2px] w-8 bg-${color} mt-[2px]`}></span>
                </p>
            )}
            <Card>
                <div className="flex gap-3 min-h-20 items-center">                   
                    <div className="mask mask-squircle w-16">
                        {meal ?
                            <img src={`https://picsum.photos/500/500?random=${randomImageNumber}`} />
                            :
                            <div className={`bg-${color} w-20 h-20`}></div>
                        }
                    </div>
                    <div className="flex flex-col justify-center items-start flex-1">
                        {source && <span className="text-[8px] uppercase text-black/60 mb-1"><span className="font-bold">{source.author}</span> • {source.book}</span>}
                        {!meal && <span className="text-[8px] uppercase text-black/60 mb-1"><span className="font-bold">Nothing planned yet</span></span>}
                        <span className="font-bold">{meal || "Add a meal"}</span>
                        {side && <span className="text-black/60 text-xs">with {side}</span>}
                        {!meal && <span className="text-black/60 text-xs">Choose something delicious</span>}
                    </div>
                    <button className="btn flex items-center">
                        {icon ? icon : meal ? <FaPen /> : <FaPlus />}
                    </button>
                </div>
            </Card>
        </div>
    );
}
