import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import MealCard from "../components/MealCard";
import { FaChevronRight } from "react-icons/fa";
import { recipes, authors, books } from "../dummy-data";

export default function Home() {
    const favoriteMeals = recipes.map(recipe => {
        const author = authors.find(author => author.id === recipe.selectedAuthor)?.label || "Unknown Author";
        const book = books.find(book => book.id === recipe.selectedBook)?.label || "Unknown Book";
        return {
            title: recipe.recipeName,
            source: { author, book },
            badge: recipe.selectedCountry,
        };
    });

    const getColor = (index) => {
        const colors = ["accent", "secondary", "primary"];
        return colors[index % colors.length];
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <h3 className="font-medium">Meal plans</h3>
                <div className="grid grid-cols-9 gap-4">
                    <div className="col-span-5 flex flex-col">
                        <Link to="meal-plan/1" className="w-full h-full">
                            <Card className="text h-full">
                                <div className="flex gap-2 flex-col h-full">
                                    <div className="flex flex-col grow">
                                        <span className="text-lg font-bold">This week</span>
                                        <span className="text-xs">Mon 1 Jul - Sun 7 Jul</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="grid grid-cols-2 items-center">
                                            <span className="text-xs">Breakfast</span>
                                            <div className="flex h-[16px]">
                                                <div className="bg-accent w-[52%] h-full rounded-l flex items-center justify-end px-1">
                                                    <span className="text-[10px] font-bold">
                                                        4
                                                    </span>
                                                </div>
                                                <div className="bg-neutral h-full flex-grow rounded-r"></div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <span className="text-xs">Lunch</span>
                                            <div className="flex h-[16px]">
                                                <div className="bg-secondary w-[33%] h-full rounded-l flex items-center justify-end px-1">
                                                    <span className="text-[10px] font-bold">
                                                        2
                                                    </span>
                                                </div>
                                                <div className="bg-neutral h-full flex-grow rounded-r"></div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <span className="text-xs">Dinner</span>
                                            <div className="flex h-[16px]">
                                                <div className="bg-primary w-[90%] h-full rounded-l flex items-center justify-end px-1">
                                                    <span className="text-[10px] font-bold">
                                                        6
                                                    </span>
                                                </div>
                                                <div className="bg-neutral h-full flex-grow rounded-r"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 col-span-4">
                        <Card className="flex-grow">
                            <p className="text-lg font-bold">1</p>
                            <p className="text-xs font-medium text-base-content/60">Upcoming</p>
                        </Card>
                        <Card className="flex-grow">
                            <p className="text-lg font-bold">12</p>
                            <p className="text-xs font-medium text-base-content/60">Previous</p>
                        </Card>
                    </div>
                </div>
                <h3 className="font-medium">Favourite meals</h3>
                {favoriteMeals.map((meal, index) => (
                    <Link to={`/recipe/${index + 1}`} key={index} className="w-full">
                        <MealCard
                            key={index}
                            meal={meal.title}
                            color={getColor(index)}
                            source={meal.source}
                            icon={<FaChevronRight />}
                        />
                    </Link>
                ))}
            </div>
        </>
    );
}
