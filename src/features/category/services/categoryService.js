import api from '../../../api/api'

const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await api.get('/categories')
      console.log('Category API response: ', response.data)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch categories')
    }
  },

  getCategoryById: async (categoryId) => {
    try {
      const response = await api.get(`/categories/${categoryId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch category with ID ${categoryId}`)
    }
  },

  addCategory: async (category) => {
    try {
      const response = await api.post('/categories', category)
      return response.data
    } catch (error) {
      throw new Error('Failed to add category')
    }
  },

  updateCategory: async (categoryId, category) => {
    try {
      const response = await api.put(`/categories/${categoryId}`, category)
      return response.data
    } catch (error) {
      throw new Error(`Failed to update category with ID ${categoryId}`)
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await api.delete(`/categories/${categoryId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to delete category with ID ${categoryId}`)
    }
  }
}
export default categoryService
