import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import Modal from './ui/Modal';
import Button from './ui/Button';
import TextInput from './ui/TextInput';
import Select from './ui/Select';

function AddRecipeModal() {
    const [recipeName, setRecipeName] = useState('');
    const [authorID, setAuthorID] = useState('');
    const [bookID, setBookID] = useState('');
    const [pageNumber, setPageNumber] = useState('');
    const [onlineURL, setOnlineURL] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [servings, setServings] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    const { authors, recipeBooks, createRecipe } = useData();

    useEffect(() => {
        if (authorID) {
            setFilteredBooks(recipeBooks.filter(book => book.AuthorID === parseInt(authorID)));
        } else {
            setFilteredBooks([]);
        }
    }, [authorID, recipeBooks]);

    const handleAuthorChange = (e) => {
        setAuthorID(e.target.value);
        setBookID(''); // Reset book selection when author changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipe = {
            RecipeName: recipeName,
            AuthorID: parseInt(authorID) || null,
            BookID: parseInt(bookID) || null,
            PageNumber: parseInt(pageNumber) || null,
            OnlineURL: onlineURL,
            CookTime: parseInt(cookTime) || null,
            Difficulty: difficulty,
            Type: type,
            ImageURL: imageURL,
            Servings: parseInt(servings) || null,
            Cuisine: cuisine,
        };

        try {
            await createRecipe(recipe);
            document.getElementById('add_recipe_modal').close();
        } catch (error) {
            alert('Failed to add recipe');
        }
    };

    const authorOptions = authors.map(author => ({
        value: author.AuthorID,
        label: author.AuthorName
    }));

    const bookOptions = filteredBooks.map(book => ({
        value: book.BookID,
        label: book.BookName
    }));

    return (
        <Modal id="add_recipe_modal" title="Add Recipe">
            <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
                <TextInput
                    label="Recipe Name"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    required
                />
                <Select
                    label="Author"
                    value={authorID}
                    onChange={handleAuthorChange}
                    options={authorOptions}
                    defaultOption="Select an author"
                />
                <Select
                    label="Book"
                    value={bookID}
                    onChange={(e) => setBookID(e.target.value)}
                    options={bookOptions}
                    defaultOption="Select a book"
                    disabled={!authorID}
                />
                <TextInput
                    label="Page Number"
                    type="number"
                    value={pageNumber}
                    onChange={(e) => setPageNumber(e.target.value)}
                    disabled={!bookID}
                />
                <TextInput
                    label="Online URL"
                    type="url"
                    value={onlineURL}
                    onChange={(e) => setOnlineURL(e.target.value)}
                />
                <TextInput
                    label="Cook Time (minutes)"
                    type="number"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    required
                />
                <TextInput
                    label="Difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                />
                <TextInput
                    label="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <TextInput
                    label="Image URL"
                    type="url"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                />
                <TextInput
                    label="Servings"
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    required
                />
                <TextInput
                    label="Cuisine"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                />
                <Button>Add Recipe</Button>
            </form>
        </Modal>
    );
}

export default AddRecipeModal;
