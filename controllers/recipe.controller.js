import Recipe from "../models/recipe.model.js";

// Create Recipe
export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe created successfully", data: newRecipe });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ message: "All recipes", data: recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe found", data: recipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Recipe
export const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe updated", data: updatedRecipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Recipe
export const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
