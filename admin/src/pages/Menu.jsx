import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Save, X, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

// API base URL (adjust if needed)
const API_BASE = '/api';

// Real API service using axios
const api = {
  // Category CRUD
  getCategories: async () => {
    // Fetch categories from backend
    const res = await axios.get(`${API_BASE}/categories`);
    return res.data;
  },

  createCategory: async (category) => {
    // Create category in backend
    const res = await axios.post(`${API_BASE}/categories`, category);
    return res.data;
  },

  updateCategory: async (id, category) => {
    // Update category in backend
    const res = await axios.put(`${API_BASE}/categories/${id}`, category);
    return res.data;
  },

  deleteCategory: async (id) => {
    // Delete category in backend
    await axios.delete(`${API_BASE}/categories/${id}`);
    return { success: true };
  },

  // Menu Items CRUD
  getMenuItems: async (categoryId) => {
    // Fetch menu items by category from backend
    const res = await axios.get(`${API_BASE}/menus/category/${categoryId}`);
    return res.data;
  },

  createMenuItem: async (categoryId, item, imageFile) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('name', item.name);
      formData.append('description', item.description);
      formData.append('price', item.price);
      formData.append('badge', item.badge);
      formData.append('image', imageFile);
      const res = await axios.post(`${API_BASE}/menus/category/${categoryId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } else {
      // If only URL is provided
      const res = await axios.post(`${API_BASE}/menus/category/${categoryId}`, item);
      return res.data;
    }
  },

  updateMenuItem: async (itemId, item, imageFile) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('name', item.name);
      formData.append('description', item.description);
      formData.append('price', item.price);
      formData.append('badge', item.badge);
      formData.append('image', imageFile);
      const res = await axios.put(`${API_BASE}/menus/${itemId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } else {
      const res = await axios.put(`${API_BASE}/menus/${itemId}`, item);
      return res.data;
    }
  },

  deleteMenuItem: async (itemId) => {
    await axios.delete(`${API_BASE}/menus/${itemId}`);
    return { success: true };
  }
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, rounded = "rounded-lg" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white ${rounded} max-w-md w-full max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// Category Form Component
const CategoryForm = ({ category, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || ''
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter category name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter category description"
          rows="3"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            if (formData.name.trim()) {
              onSave(formData);
            }
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
          disabled={loading}
        >
          {loading ? 'Saving...' : <><Save size={16} /> Save</>}
        </button>
      </div>
    </div>
  );
};

// Menu Item Form Component
const MenuItemForm = ({ item, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || '',
    image: item?.image || '',
    badge: item?.badge || ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = () => {
    if (formData.name.trim() && formData.price) {
      onSave({ ...formData, price: parseFloat(formData.price) }, imageFile);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter item name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter item description"
          rows="3"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="0.00"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            setImageFile(e.target.files[0]);
            // Optionally show preview
            if (e.target.files[0]) {
              setFormData({ ...formData, image: '' });
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="text-xs text-gray-400 mt-1">Or paste an image URL below</div>
        <input
          type="url"
          value={formData.image}
          onChange={e => {
            setFormData({ ...formData, image: e.target.value });
            setImageFile(null);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
          placeholder="https://example.com/image.jpg"
        />
        {(imageFile || formData.image) && (
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
            alt="Preview"
            className="mt-2 w-24 h-24 object-cover rounded-xl border"
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Badge (Optional)</label>
        <input
          type="text"
          value={formData.badge}
          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Popular, New, etc."
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
          disabled={loading}
        >
          {loading ? 'Saving...' : <><Save size={16} /> Save</>}
        </button>
      </div>
    </div>
  );
};

// Menu Item Component with CRUD actions
const MenuItem = ({ item, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      {/* Menu Item Image & Badge */}
      <div className="relative flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <img
            src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'}
            alt={item.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-2xl group-hover:scale-110 transition-transform duration-500"
          />
          {item.badge && (
            <span className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
              {item.badge}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">{item.name}</h3>
      </div>
      <div className="text-slate-600 text-base mb-4 text-center min-h-[48px]">{item.description}</div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-green-600 font-bold text-xl">{item.price} Birr</span>
      </div>
      {/* Ingredient View */}
      {item.ingredient && (
        <div className="text-slate-500 text-sm mb-2 text-center">
          <span className="font-semibold">Ingredients:</span> {item.ingredient}
        </div>
      )}
      {isAdmin && (
        <div className="relative flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-xl text-sm font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-1"
          >
            <Edit size={16} /> Edit
          </button>
          <button
            onClick={() => onDelete(item)}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-3 rounded-xl text-sm font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-1"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

// Confirmation Dialog
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-amber-600">
          <AlertTriangle size={24} />
          <p>{message}</p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Main Component
const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin] = useState(true); // Toggle for admin mode
  
  // Modal states
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load menu items when active category changes
  useEffect(() => {
    if (activeCategory) {
      loadMenuItems(activeCategory._id);
    }
  }, [activeCategory]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await api.getCategories();
      setCategories(data);
      if (data.length > 0 && !activeCategory) {
        setActiveCategory(data[0]);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMenuItems = async (categoryId) => {
    try {
      const items = await api.getMenuItems(categoryId);
      setMenuItems(items);
    } catch (error) {
      console.error('Failed to load menu items:', error);
    }
  };

  // Category CRUD handlers
  const handleCategoryCreate = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleCategoryEdit = (category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleCategorySave = async (categoryData) => {
    try {
      setFormLoading(true);
      if (editingCategory) {
        const updated = await api.updateCategory(editingCategory._id, categoryData);
        setCategories(cats => cats.map(cat => cat._id === updated._id ? updated : cat));
        if (activeCategory?._id === updated._id) {
          setActiveCategory(updated);
        }
        toast.success('Category updated successfully!');
      } else {
        const newCategory = await api.createCategory(categoryData);
        setCategories(cats => [...cats, newCategory]);
        toast.success('Category created successfully!');
      }
      setShowCategoryForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to save category:', error);
      toast.error('Failed to save category!');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCategoryDelete = (category) => {
    setDeleteTarget({ type: 'category', data: category });
    setShowDeleteConfirm(true);
  };

  // Menu Item CRUD handlers
  const handleItemCreate = () => {
    setEditingItem(null);
    setShowItemForm(true);
  };

  const handleItemEdit = (item) => {
    setEditingItem(item);
    setShowItemForm(true);
  };

  const handleItemSave = async (itemData, imageFile) => {
    try {
      setFormLoading(true);
      if (editingItem) {
        const updated = await api.updateMenuItem(editingItem._id, itemData, imageFile);
        setMenuItems(items => items.map(item => item._id === updated._id ? updated : item));
        toast.success('Menu item updated successfully!');
      } else {
        const newItem = await api.createMenuItem(activeCategory._id, itemData, imageFile);
        setMenuItems(items => [...items, newItem]);
        toast.success('Menu item created successfully!');
      }
      setShowItemForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Failed to save menu item:', error);
      toast.error('Failed to save menu item!');
    } finally {
      setFormLoading(false);
    }
  };

  const handleItemDelete = (item) => {
    setDeleteTarget({ type: 'item', data: item });
    setShowDeleteConfirm(true);
  };

  // Delete confirmation handler
  const handleDeleteConfirm = async () => {
    try {
      setFormLoading(true);
      if (deleteTarget.type === 'category') {
        await api.deleteCategory(deleteTarget.data._id);
        setCategories(cats => cats.filter(cat => cat._id !== deleteTarget.data._id));
        if (activeCategory?._id === deleteTarget.data._id) {
          const remainingCategories = categories.filter(cat => cat._id !== deleteTarget.data._id);
          setActiveCategory(remainingCategories[0] || null);
        }
      } else {
        await api.deleteMenuItem(deleteTarget.data._id);
        setMenuItems(items => items.filter(item => item._id !== deleteTarget.data._id));
      }
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
      toast.success('Deleted successfully!');
    } catch (error) {
      console.error('Failed to delete:', error);
      toast.error('Failed to delete!');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-200 mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-green-400 opacity-20 mx-auto"></div>
          </div>
          <p className="text-slate-600 text-lg font-medium">Loading our delicious menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl mb-6 shadow-2xl">
              <span className="text-3xl">🍽️</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-green-900 to-emerald-900 bg-clip-text text-transparent mb-4">
              Our Menu Selection
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore our curated menu categories and mouth-watering dishes
            </p>
            <div className="mt-6 inline-flex items-center bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl border border-white/20">
              <span className="text-slate-700 font-semibold">
                {categories.length} {categories.length === 1 ? 'category' : 'categories'}
              </span>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {categories.map((category) => (
              <div key={category._id} className="relative group">
                <button
                  className={`px-6 py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg border border-white/20 backdrop-blur-sm flex items-center justify-between gap-2 w-full min-w-[160px] relative ${
                    activeCategory?._id === category._id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105'
                      : 'bg-white/80 text-gray-700 hover:bg-green-50'
                  }`}
                  onClick={() => setActiveCategory(category)}
                  style={{ paddingRight: isAdmin ? '56px' : undefined }}
                >
                  <span className="truncate">{category.name}</span>
                  {isAdmin && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); handleCategoryEdit(category); }}
                        className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors shadow focus:outline-none"
                        tabIndex={-1}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); handleCategoryDelete(category); }}
                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow focus:outline-none"
                        tabIndex={-1}
                      >
                        <Trash2 size={14} />
                      </button>
                    </span>
                  )}
                </button>
              </div>
            ))}
            {isAdmin && (
              <button
                onClick={handleCategoryCreate}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold whitespace-nowrap"
              >
                <Plus size={18} /> Add Category
              </button>
            )}
          </div>

          {/* Active Category Content */}
          {activeCategory && (
            <>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <h2 className="text-3xl font-bold text-slate-900">{activeCategory.name}</h2>
                  {isAdmin && (
                    <button
                      onClick={handleItemCreate}
                      className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 flex items-center gap-2 text-base font-bold shadow-lg"
                    >
                      <Plus size={16} /> Add Item
                    </button>
                  )}
                </div>
                <p className="text-slate-600 mb-4">{activeCategory.description}</p>
                <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems.map((item) => (
                  <div key={item._id} className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    {/* Menu Item Image & Badge */}
                    <div className="relative flex flex-col items-center mb-6">
                      <div className="relative mb-4">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'}
                          alt={item.name}
                          className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-2xl group-hover:scale-110 transition-transform duration-500"
                        />
                        {item.badge && (
                          <span className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">{item.name}</h3>
                    </div>
                    <div className="text-slate-600 text-base mb-4 text-center min-h-[48px]">{item.description}</div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-green-600 font-bold text-xl">{item.price} Birr</span>
                    </div>
                    {/* Ingredient View */}
                    {item.ingredient && (
                      <div className="text-slate-500 text-sm mb-2 text-center">
                        <span className="font-semibold">Ingredients:</span> {item.ingredient}
                      </div>
                    )}
                    {isAdmin && (
                      <div className="relative flex gap-2">
                        <button
                          onClick={() => handleItemEdit(item)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-xl text-sm font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-1"
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleItemDelete(item)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-3 rounded-xl text-sm font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-1"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {menuItems.length === 0 && (
                <div className="text-center py-16">
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 max-w-md mx-auto">
                    <span className="text-5xl block mb-6">🍽️</span>
                    <p className="text-xl text-slate-600 mb-2 font-semibold">No items in this category yet.</p>
                    <p className="text-slate-500">Start adding delicious dishes!</p>
                    {isAdmin && (
                      <button
                        onClick={handleItemCreate}
                        className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold flex items-center gap-2 mx-auto"
                      >
                        <Plus size={18} /> Add First Item
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Empty State for No Categories */}
          {categories.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 max-w-md mx-auto">
                <span className="text-5xl block mb-6">📂</span>
                <p className="text-xl text-slate-600 mb-2 font-semibold">No categories found</p>
                <p className="text-slate-500 mb-6">Start building your menu categories!</p>
                {isAdmin && (
                  <button
                    onClick={handleCategoryCreate}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold flex items-center gap-2 mx-auto"
                  >
                    <Plus size={18} /> Add First Category
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showCategoryForm}
        onClose={() => setShowCategoryForm(false)}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
        rounded="rounded-3xl"
      >
        <CategoryForm
          category={editingCategory}
          onSave={handleCategorySave}
          onCancel={() => setShowCategoryForm(false)}
          loading={formLoading}
        />
      </Modal>

      <Modal
        isOpen={showItemForm}
        onClose={() => setShowItemForm(false)}
        title={editingItem ? 'Edit Menu Item' : 'Create Menu Item'}
        rounded="rounded-3xl"
      >
        <MenuItemForm
          item={editingItem}
          onSave={handleItemSave}
          onCancel={() => setShowItemForm(false)}
          loading={formLoading}
        />
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${deleteTarget?.type === 'category' ? 'Category' : 'Menu Item'}`}
        message={`Are you sure you want to delete "${deleteTarget?.data?.name}"? This action cannot be undone.`}
        loading={formLoading}
      />

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Menu;