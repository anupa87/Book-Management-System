import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import categoryService from '../../category/services/categoryService'

export const getAllCategories = createAsyncThunk('categories/getAllCategories', async () => {
  const categories = await categoryService.getAllCategories()
  console.log(categories)
  return categories
})

export const getCategoryById = createAsyncThunk(
  'categories/getCategoryById',
  async (categoryId) => {
    const category = await categoryService.getCategoryById(categoryId)
    return category
  }
)

export const addCategory = createAsyncThunk('categories/addCategory', async (category) => {
  const newCategory = await categoryService.addCategory(category)
  return newCategory
})

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (categoryId, category) => {
    const updateCategory = await categoryService.updateCategory(categoryId, category)
    return updateCategory
  }
)

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
  const deleteCategory = await categoryService.deleteCategory(categoryId)
  return deleteCategory
})

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
  selectedCategory: null
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,

  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.categories = action.payload
        console.log('getAllCategories.fulfilled: ', action.payload)
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log('getAllCategories.rejected:', action.error.message)
      })
      .addCase(getCategoryById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedCategory = action.payload
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.categories.push(action.payload)
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const updatedCategoryIndex = state.categories.findIndex(
          (categoryId) => categoryId.categoryId === action.payload.categoryId
        )
        state.categories[updatedCategoryIndex] = action.payload
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.categories = state.categories.filter(
          (categoryId) => categoryId.categoryId !== action.payload
        )
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setSelectedCategory } = categorySlice.actions

export default categorySlice.reducer
