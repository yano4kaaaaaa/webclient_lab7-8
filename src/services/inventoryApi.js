import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000', // ← замінити на свій URL
})

export const getInventory = () =>
  API.get('/inventory')

export const getInventoryById = (id) =>
  API.get(`/inventory/${id}`)

export const createInventory = (formData) =>
  API.post('/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const updateInventory = (id, data) =>
  API.put(`/inventory/${id}`, data)

export const updateInventoryPhoto = (id, formData) =>
  API.put(`/inventory/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const deleteInventory = (id) =>
  API.delete(`/inventory/${id}`)

export const getPhotoUrl = (id) =>
  `http://localhost:3000/inventory/${id}/photo`