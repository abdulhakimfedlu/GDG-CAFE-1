import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, Building, Calendar, DollarSign, Star, Search, Filter, Plus, Edit3, Trash2, X, Save, Eye } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    image: '',
    position: 'waiter',
    salary: '',
    dateHired: new Date().toISOString().split('T')[0]
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Fetch employee data from backend API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/employees');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const getPositionStyle = (position) => {
    const styles = {
      'waiter': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200',
      'cashier': 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-200',
      'manager': 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-200',
      'baresta': 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-200',
      'chaf': 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-200'
    };
    return styles[position] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-gray-200';
  };

  const getPositionIcon = (position) => {
    const icons = {
      'waiter': '🍽️',
      'cashier': '💰',
      'manager': '👔',
      'baresta': '☕',
      'chaf': '👨‍🍳'
    };
    return icons[position] || '👤';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'all' || employee.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  const positions = ['waiter', 'cashier', 'manager', 'baresta', 'chaf'];

  // CRUD Operations
  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      name: '',
      phone: '',
      image: '',
      position: 'waiter',
      salary: '',
      dateHired: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setModalMode('edit');
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name || '',
      phone: employee.phone || '',
      image: employee.image || '',
      position: employee.position || 'waiter',
      salary: employee.salary || '',
      dateHired: employee.dateHired ? new Date(employee.dateHired).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleView = (employee) => {
    setModalMode('view');
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = async (employee) => {
    if (window.confirm(`Are you sure you want to remove ${employee.name} from the team?`)) {
      try {
        const response = await fetch(`/api/employees/${employee._id || employee.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setEmployees(employees.filter(emp => (emp._id || emp.id) !== (employee._id || employee.id)));
          toast.success('Employee deleted successfully!');
        } else {
          toast.error('Failed to delete employee!');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        toast.error('Error deleting employee!');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    // Frontend validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.position || !formData.salary) {
      setFormError("Please fill in all required fields.");
      setFormLoading(false);
      return;
    }
    if (isNaN(parseFloat(formData.salary)) || parseFloat(formData.salary) < 0) {
      setFormError("Salary must be a valid non-negative number.");
      setFormLoading(false);
      return;
    }

    try {
      const url = modalMode === 'create' ? '/api/employees' : `/api/employees/${selectedEmployee._id || selectedEmployee.id}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      let response;
      if (imageFile) {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('phone', formData.phone);
        data.append('position', formData.position);
        data.append('salary', String(formData.salary));
        data.append('dateHired', formData.dateHired);
        data.append('image', imageFile);
        response = await fetch(url, {
          method,
          body: data,
        });
      } else {
        response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            salary: String(formData.salary)
          }),
        });
      }

      if (response.ok) {
        const result = await response.json();
        
        if (modalMode === 'create') {
          setEmployees([...employees, result]);
        } else {
          setEmployees(employees.map(emp => 
            (emp._id || emp.id) === (selectedEmployee._id || selectedEmployee.id) ? result : emp
          ));
        }
        
        setShowModal(false);
        setSelectedEmployee(null);
        toast.success(modalMode === 'create' ? 'Employee added successfully!' : 'Employee updated successfully!');
      } else {
        const errorText = await response.text();
        setFormError('Failed to save employee: ' + errorText);
        toast.error('Failed to save employee!');
      }
    } catch (error) {
      setFormError('Error saving employee: ' + error.message);
      console.error('Error saving employee:', error);
      toast.error('Error saving employee!');
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-blue-400 opacity-20 mx-auto"></div>
          </div>
          <p className="text-slate-600 text-lg font-medium">Loading our amazing team...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-6xl mb-6">🚨</div>
          <p className="text-red-600 mb-6 text-lg font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl">
              <span className="text-3xl">🍴</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
              Our Culinary Dream Team
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Meet the passionate individuals who create exceptional dining experiences every day
            </p>
            <div className="mt-6 inline-flex items-center bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl border border-white/20">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-slate-700 font-semibold">
                {filteredEmployees.length} {filteredEmployees.length === 1 ? 'team member' : 'team members'}
              </span>
            </div>
          </div>

          {/* Search, Filter, and Add Button Section */}
          <div className="mb-10 flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="pl-12 pr-8 py-4 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="all">All Positions</option>
                {positions.map(position => (
                  <option key={position} value={position}>
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Team Member
            </button>
          </div>

          {/* Employee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEmployees.map((employee, index) => (
              <div 
                key={employee._id || employee.id || index} 
                className="group bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100/40 p-8 hover:shadow-3xl hover:bg-white transition-all duration-500 transform hover:-translate-y-2 relative overflow-visible flex flex-col items-center"
              >
                {/* Gradient Accent Ring */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-28 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl z-0"></div>
                {/* Employee Avatar & Basic Info */}
                <div className="relative flex flex-col items-center mb-4 z-10">
                  <div className="relative mb-2">
                    <img 
                      src={employee.image || 'https://via.placeholder.com/150'} 
                      alt={employee.name}
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500 bg-gray-100"
                    />
                    <div className="absolute -bottom-2 -right-2 text-2xl drop-shadow-md">
                      {getPositionIcon(employee.position)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 text-center">
                    {employee.name}
                  </h3>
                  <div className={`inline-flex px-3 py-1 rounded-xl text-xs font-bold shadow ${getPositionStyle(employee.position)} mt-1`}>
                    {employee.position?.charAt(0).toUpperCase() + employee.position?.slice(1)}
                  </div>
                </div>
                {/* Contact Information */}
                <div className="w-full space-y-3 mb-4 z-10">
                  <div className="flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-300 gap-2">
                    <Phone className="w-4 h-4 mr-1 flex-shrink-0" />
                    <a 
                      href={`tel:${employee.phone}`}
                      className="text-xs font-medium hover:underline truncate"
                    >
                      {employee.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-slate-600 gap-2">
                    <DollarSign className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="text-xs font-bold text-green-600">
                      {employee.salary} Birr
                    </span>
                  </div>
                  <div className="flex items-center text-slate-600 gap-2">
                    <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="text-xs">
                      Joined {formatDate(employee.dateHired)}
                    </span>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex w-full gap-2 mt-auto z-10">
                  <button 
                    onClick={() => handleView(employee)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-2 rounded-xl text-xs font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button 
                    onClick={() => handleEdit(employee)}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-2 rounded-xl text-xs font-bold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md flex items-center justify-center gap-1"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(employee)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-2 rounded-xl text-xs font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredEmployees.length === 0 && employees.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 max-w-md mx-auto">
                <Search className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                <p className="text-xl text-slate-600 mb-2 font-semibold">No matches found</p>
                <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
              </div>
            </div>
          )}

          {employees.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 max-w-md mx-auto">
                <User className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                <p className="text-xl text-slate-600 mb-2 font-semibold">No team members found</p>
                <p className="text-slate-500 mb-6">Start building your dream team!</p>
                <button
                  onClick={handleCreate}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Add First Team Member
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {modalMode === 'create' && 'Add New Team Member'}
                {modalMode === 'edit' && 'Edit Team Member'}
                {modalMode === 'view' && 'Team Member Details'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-2xl transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-6">
              {modalMode === 'view' ? (
                // View Mode
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <img 
                      src={selectedEmployee?.image || 'https://via.placeholder.com/150'} 
                      alt={selectedEmployee?.name}
                      className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-2xl mx-auto mb-4"
                    />
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">{selectedEmployee?.name}</h3>
                    <div className={`inline-flex px-4 py-2 rounded-2xl text-sm font-bold shadow-lg ${getPositionStyle(selectedEmployee?.position)}`}>
                      {getPositionIcon(selectedEmployee?.position)} {selectedEmployee?.position?.charAt(0).toUpperCase() + selectedEmployee?.position?.slice(1)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                      <div className="flex items-center mb-3">
                        <Phone className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="font-semibold text-blue-900">Phone Number</span>
                      </div>
                      <p className="text-blue-800 font-medium">{selectedEmployee?.phone}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                      <div className="flex items-center mb-3">
                        <DollarSign className="w-5 h-5 text-green-600 mr-3" />
                        <span className="font-semibold text-green-900">Salary</span>
                      </div>
                      <p className="text-green-800 font-bold text-xl">{selectedEmployee?.salary} Birr</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 md:col-span-2">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                        <span className="font-semibold text-purple-900">Date Hired</span>
                      </div>
                      <p className="text-purple-800 font-medium">{formatDate(selectedEmployee?.dateHired)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                // Create/Edit Mode
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                        placeholder="Enter phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Position *
                      </label>
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                      >
                        {positions.map(position => (
                          <option key={position} value={position}>
                            {getPositionIcon(position)} {position.charAt(0).toUpperCase() + position.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Salary *
                      </label>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                        placeholder="Enter salary amount"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Date Hired
                      </label>
                      <input
                        type="date"
                        name="dateHired"
                        value={formData.dateHired}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          setImageFile(e.target.files[0]);
                          if (e.target.files[0]) {
                            setFormData(prev => ({ ...prev, image: '' }));
                          }
                        }}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                      />
                      <div className="text-xs text-gray-400 mt-1">Or paste an image URL below</div>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={e => {
                          setFormData(prev => ({ ...prev, image: e.target.value }));
                          setImageFile(null);
                        }}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 mt-1"
                        placeholder="https://example.com/image.jpg"
                      />
                      {(imageFile || formData.image) && (
                        <img
                          src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                          alt="Preview"
                          className="mt-2 w-16 h-16 object-cover rounded-2xl border"
                        />
                      )}
                    </div>
                  </div>
                  
                  {/* Form Preview */}
                  {(formData.name || formData.image) && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                      <h4 className="font-bold text-slate-700 mb-4">Preview</h4>
                      <div className="flex items-center space-x-4">
                        <img 
                          src={formData.image || 'https://via.placeholder.com/150'} 
                          alt="Preview"
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg"
                        />
                        <div>
                          <h5 className="font-bold text-slate-900">{formData.name || 'Name'}</h5>
                          <p className="text-slate-600">{formData.position?.charAt(0).toUpperCase() + formData.position?.slice(1)}</p>
                          {formData.salary && (
                            <p className="text-green-600 font-bold">{formData.salary} Birr</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Form Actions */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-bold hover:bg-gray-200 transition-colors duration-200"
                      disabled={formLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={formLoading}
                    >
                      {formLoading ? (
                        <span className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      {modalMode === 'create' ? 'Save' : 'Update'}
                    </button>
                  </div>

                  {/* Error Message */}
                  {formError && (
                    <div className="bg-red-100 text-red-700 rounded-xl px-4 py-2 mb-4 font-semibold border border-red-200">
                      {formError}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EmployeeListPage;