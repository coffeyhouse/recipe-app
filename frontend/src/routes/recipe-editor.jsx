import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import Card from "../components/Card";
import { FaChevronRight, FaPlus } from "react-icons/fa";
import Modal from "../components/Modal";
import FlagRadio from "../components/FlagRadio";
import { NavLink, useParams } from "react-router-dom";
import {authors, books, recipes } from "../dummy-data"

export default function RecipeEditor() {
    const { recipeId } = useParams();
    const [step, setStep] = useState(1);
    const [recipeName, setRecipeName] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [selectedBook, setSelectedBook] = useState("");
    const [pageNumber, setPageNumber] = useState("");
    const [recipeUrl, setRecipeUrl] = useState("");
    const [selectedType, setSelectedType] = useState("main");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [sourceType, setSourceType] = useState("none");
    const [servings, setServings] = useState(4);
    const [cookingTime, setCookingTime] = useState("");
    const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);
    const [isAddRecipeBookModalOpen, setIsAddRecipeBookModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    useEffect(() => {
        if (recipeId) {
            const recipe = recipes.find(r => r.id === parseInt(recipeId));
            if (recipe) {
                setRecipeName(recipe.recipeName);
                setSelectedAuthor(recipe.selectedAuthor);
                setSelectedBook(recipe.selectedBook);
                setPageNumber(recipe.pageNumber);
                setRecipeUrl(recipe.recipeUrl);
                setSelectedType(recipe.selectedType);
                setSelectedCountry(recipe.selectedCountry);
                setServings(recipe.servings);
                setCookingTime(recipe.cookingTime);
                setSourceType(recipe.recipeUrl ? "online" : "book");
            }
        }
    }, [recipeId]);

    // const authorOptions = [
    //     { id: 1, label: "Jamie Oliver" },
    //     { id: 2, label: "Pinch of Nom" },
    //     { id: 3, label: "Bored of Lunch" },
    //     { id: 4, label: "Good Food" },
    //     { id: 5, label: "Gino D'Acampo" },
    // ];

    // const bookOptions = [
    //     { id: 1, label: "5 Ingredients", authorId: 1 },
    //     { id: 2, label: "Ministry of Food", authorId: 1 },
    //     { id: 3, label: "Quick & Easy", authorId: 2 },
    //     { id: 4, label: "Everyday Light", authorId: 2 },
    //     { id: 5, label: "The Healthy Air Fryer Book", authorId: 3 },
    //     { id: 6, label: "Healthy Slow Cooker: Even Easier", authorId: 3 },
    //     { id: 7, label: "Ultimate Slow Cooker Recipes", authorId: 4 },
    //     { id: 8, label: "Gino's Italian Escape", authorId: 5 },
    //     { id: 9, label: "Gino's Italy", authorId: 5 },
    // ];

    const sourceTypeOptions = [
        { id: "none", label: "None" },
        { id: "book", label: "Recipe book" },
        { id: "online", label: "Online" }
    ];

    const logState = () => {
        console.log({
            recipeName,
            selectedType,
            servings,
            selectedAuthor,
            selectedBook,
            pageNumber,
            recipeUrl,
            cookingTime,
            selectedCountry,
        });
    };

    const handleRecipeNameChange = (event) => {
        setRecipeName(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
        setSelectedBook("");
        setSourceType("");
        setSelectedBook("");
        setRecipeUrl("");
    };

    const handleBookChange = (event) => {
        setSelectedBook(event.target.value);
    };

    const handlePageNumberChange = (event) => {
        setPageNumber(event.target.value);
    };

    const handleRecipeUrlChange = (event) => {
        setRecipeUrl(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleSourceTypeChange = (event) => {
        setSourceType(event.target.value);

        setSelectedBook("");
        setRecipeUrl("");
    };

    const handleServingsChange = (event) => {
        setServings(parseInt(event.target.value));
    };

    const handleCookingTimeChange = (event) => {
        setCookingTime(parseInt(event.target.value));
    };

    const handleNextStep = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 3));
    };

    const handleBackStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    const handleRecipeSubmit = () => {
        logState();
        openSuccessModal();
    }

    const isNextButtonDisabled = () => {
        if (step === 1) {
            return !recipeName || !selectedType;
        }
        if (step === 2) {
            return !selectedAuthor;
        }

        if (step === 3) {
            return !selectedCountry;
        }

        return false;
    };

    const filteredBookOptions = books.filter(book => book.authorId === parseInt(selectedAuthor));

    const openAddAuthorModal = () => {
        setIsAddAuthorModalOpen(true);
    };

    const closeAddAuthorModal = () => {
        setIsAddAuthorModalOpen(false);
    };

    const openAddRecipeBookModal = () => {
        setIsAddRecipeBookModalOpen(true);
    };

    const closeAddRecipeBookModal = () => {
        setIsAddRecipeBookModalOpen(false);
    };

    const openSuccessModal = () => {
        setIsSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                    <span className={`block ${step === 1 ? 'bg-accent' : 'bg-gray-200'} text-accent-content w-5 h-5 text-xs rounded flex items-center justify-center font-bold`}>1</span>
                    {step === 1 && <span className="text-xs font-medium">Details</span>}
                </div>
                <span className="text-[8px] text-black/90"><FaChevronRight /></span>
                <div className="flex gap-1 items-center">
                    <span className={`block ${step === 2 ? 'bg-secondary' : 'bg-gray-200'} text-secondary-content w-5 h-5 text-xs rounded flex items-center justify-center font-bold`}>2</span>
                    {step === 2 && <span className="text-xs font-medium">Author</span>}
                </div>
                <span className="text-[8px] text-black/90"><FaChevronRight /></span>
                <div className="flex gap-1 items-center">
                    <span className={`block ${step === 3 ? 'bg-primary' : 'bg-gray-200'} text-primary-content w-5 h-5 text-xs rounded flex items-center justify-center font-bold`}>3</span>
                    {step === 3 && <span className="text-xs font-medium">Other details</span>}
                </div>
            </div>
            <Card className="grow h-full p-2">
                <div className="flex flex-col justify-between h-full">
                    {step === 1 && (
                        <div className="flex flex-col gap-6">
                            <Input
                                label="Recipe name"
                                onChange={handleRecipeNameChange}
                                required
                                value={recipeName}
                            />

                            <div>
                                <div className="label">
                                    <span className="label-text text-sm font-medium">Type</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        name="meal-type"
                                        className="btn btn-sm"
                                        aria-label="Main"
                                        value="main"
                                        onChange={handleTypeChange}
                                        checked={selectedType === "main"}
                                    />
                                    <input
                                        type="radio"
                                        name="meal-type"
                                        className="btn btn-sm"
                                        aria-label="Side"
                                        value="side"
                                        onChange={handleTypeChange}
                                        checked={selectedType === "side"}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="label">
                                    <span className="label-text text-sm font-medium">Servings</span>
                                </div>
                                <input
                                    type="range"
                                    min={1}
                                    max={5}
                                    value={servings}
                                    className="range"
                                    step={1}
                                    onChange={handleServingsChange}
                                />
                                <div className="flex w-full justify-between px-2 text-xs">
                                    <span>1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span>4</span>
                                    <span>5</span>
                                </div>
                            </div>

                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-2 items-end">
                                <Select
                                    label="Author"
                                    options={authors}
                                    value={selectedAuthor}
                                    onChange={handleAuthorChange}
                                />
                                <button className="btn" onClick={openAddAuthorModal}><FaPlus /></button>
                            </div>
                            <Select
                                label="Recipe type"
                                options={sourceTypeOptions}
                                disabled={!selectedAuthor}
                                value={sourceType}
                                onChange={handleSourceTypeChange}
                            />
                            <div className="flex gap-2 items-end">
                                <div className="w-full max-w-xs flex-shrink-1">
                                    <Select
                                        label="Recipe book"
                                        options={filteredBookOptions}
                                        disabled={sourceType !== "book"}
                                        value={selectedBook}
                                        onChange={handleBookChange}
                                    />
                                </div>
                                <button
                                    className="btn"
                                    onClick={openAddRecipeBookModal}
                                    disabled={sourceType !== "book"}
                                >
                                    <FaPlus />
                                </button>
                            </div>

                            {sourceType === "book" ? (<Input
                                label="Page number"
                                type="number"
                                disabled={!selectedBook}
                                onChange={handlePageNumberChange}
                                value={pageNumber}
                            />) : <Input
                                label="Recipe URL"
                                onChange={handleRecipeUrlChange}
                                disabled={sourceType !== "online"}
                                value={recipeUrl}
                            />
                            }
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col gap-6">
                            <Input
                                label="Cooking time (minutes)"
                                type="number"
                                onChange={handleCookingTimeChange}
                                required
                                value={cookingTime}
                            />

                            <div>
                                <div className="label">
                                    <span className="label-text text-sm font-medium">Cuisine</span>
                                </div>
                                <ul className="grid grid-cols-2 gap-2 w-full flex-wrap">
                                    <FlagRadio code="MX" country="Mexican" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="US" country="American" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="CN" country="Chinese" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="GB" country="British" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="IT" country="Italian" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="ES" country="Spanish" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="FR" country="French" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="IN" country="Indian" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="GR" country="Greek" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="JP" country="Japanese" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="KR" country="Korean" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                    <FlagRadio code="TH" country="Thai" selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} />
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between gap-4">
                        <div>
                            {step > 1 && <button className="btn btn-ghost" onClick={handleBackStep}>Back</button>}
                        </div>
                        <div className="flex gap-4">
                            <button className="btn px-6">Cancel</button>
                            {step < 3 && (
                                <button className={`btn btn-accent px-6`} onClick={handleNextStep} disabled={isNextButtonDisabled()}>
                                    Next
                                </button>
                            )}
                            {step === 3 && (
                                <button className={`btn btn-secondary px-6`} onClick={handleRecipeSubmit} disabled={isNextButtonDisabled()}>
                                    Finish
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            {isAddAuthorModalOpen && (
                <Modal title="Add Author" onClose={closeAddAuthorModal}>
                    <div className="flex flex-col gap-6">

                        <Input label="Author name" className="w-full" />
                        <button className="btn btn-primary">Add author</button>
                    </div>
                </Modal>
            )}

            {isAddRecipeBookModalOpen && (
                <Modal title="Add recipe book" onClose={closeAddRecipeBookModal}>
                    <div className="flex flex-col gap-6">
                        <Input label="Title" className="w-full" />

                        <Select
                            label="Author"
                            options={authorOptions}
                            value={selectedAuthor}
                            onChange={handleAuthorChange}
                            disabled={true}
                        />
                        <button className="btn btn-primary">Add recipe book</button>
                    </div>
                </Modal>
            )}

            {isSuccessModalOpen && (
                <Modal title="Recipe Added!">
                    <div className="flex flex-col gap-6">
                        <p>Fantastic! 🎉 <span className="font-bold">{recipeName}</span>, is now part of the app!</p>
                        <p>But wait, it looks like your recipe still needs some ingredients! Shall we add them now?</p>
                        <button className="btn btn-primary">Let's add ingredients!</button>
                        <NavLink to="/" className="btn">Back to home screen</NavLink>
                    </div>
                </Modal>
            )}


        </div>
    );
}
