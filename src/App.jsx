import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messMenu, setMessMenu] = useState([
    { id: 1, day: 'Monday', breakfast: 'Poha with tea', lunch: 'Rice, Dal, Paneer Curry, Salad', dinner: 'Roti, Aloo Gobi, Curd' },
    { id: 2, day: 'Tuesday', breakfast: 'Pasta with vegetables', lunch: 'Jeera Rice, Chana Masala, Papad, Raita', dinner: 'Paratha, Potato Curry, Pickle' },
    { id: 3, day: 'Wednesday', breakfast: 'Upma with coconut chutney', lunch: 'Biryani, Raita, Salad, Papad', dinner: 'Roti, Mixed Vegetable Curry, Buttermilk' },
    { id: 4, day: 'Thursday', breakfast: 'Idli with sambar and chutney', lunch: 'Dal Makhani, Jeera Rice, Salad, Papad', dinner: 'Pulao, Paneer Tikka, Raita' },
    { id: 5, day: 'Friday', breakfast: 'Dosa with coconut chutney', lunch: 'Palak Paneer, Rice, Dal, Salad', dinner: 'Roti, Bhindi Masala, Curd' },
    { id: 6, day: 'Saturday', breakfast: 'Vada Pav with chutney', lunch: 'Matar Paneer, Naan, Salad, Raita', dinner: 'Bhel Puri, Tea' },
    { id: 7, day: 'Sunday', breakfast: 'French Toast with syrup', lunch: 'Chicken Biryani, Raita, Salad', dinner: 'Pav Bhaji, Butter Milk' }
  ]);
  
  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul Sharma', room: 'A-101', status: 'Active', meals: 21 },
    { id: 2, name: 'Priya Patel', room: 'B-205', status: 'Active', meals: 18 },
    { id: 3, name: 'Amit Kumar', room: 'C-312', status: 'Inactive', meals: 5 },
    { id: 4, name: 'Sneha Singh', room: 'A-115', status: 'Active', meals: 20 },
    { id: 5, name: 'Vikram Joshi', room: 'B-210', status: 'Active', meals: 19 },
    { id: 6, name: 'Anjali Mehta', room: 'C-308', status: 'Active', meals: 22 }
  ]);
  
  const [attendance, setAttendance] = useState({
    monday: 85, tuesday: 82, wednesday: 88, thursday: 80, friday: 90, saturday: 75, sunday: 65
  });
  
  const [newStudent, setNewStudent] = useState({ name: '', room: '' });
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.room) {
      setStudents([...students, {
        id: students.length + 1,
        name: newStudent.name,
        room: newStudent.room,
        status: 'Active',
        meals: 0
      }]);
      setNewStudent({ name: '', room: '' });
    }
  };

  const toggleStudentStatus = (id) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, status: student.status === 'Active' ? 'Inactive' : 'Active' } 
        : student
    ));
  };

  const updateMealCount = (id, increment = true) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, meals: increment ? student.meals + 1 : Math.max(0, student.meals - 1) } 
        : student
    ));
  };

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-3xl font-bold">{students.filter(s => s.status === 'Active').length}</p>
          <p className="text-blue-100 mt-2">Active members</p>
        </div>
        
        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Weekly Average Attendance</h3>
          <p className="text-3xl font-bold">{Math.round(Object.values(attendance).reduce((a, b) => a + b, 0) / Object.values(attendance).length)}%</p>
          <p className="text-green-100 mt-2">This week</p>
        </div>
        
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Daily Meals Served</h3>
          <p className="text-3xl font-bold">{students.reduce((sum, s) => sum + s.meals, 0)}</p>
          <p className="text-purple-100 mt-2">Today's total</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Overview</h2>
        <div className="grid grid-cols-7 gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <div key={day} className="text-center">
              <div className="bg-gray-100 rounded-lg p-4 h-24 flex flex-col justify-center items-center">
                <span className="font-medium text-gray-700 text-sm">{day.slice(0, 3)}</span>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${attendance[day.toLowerCase()] || 0}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-700 mt-1">{attendance[day.toLowerCase()] || 0}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Menu = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Mess Menu</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breakfast</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lunch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dinner</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messMenu.map((menu) => (
                <tr key={menu.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{menu.day}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{menu.breakfast}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{menu.lunch}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{menu.dinner}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            value={selectedDay} 
            onChange={(e) => setSelectedDay(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Day</option>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          
          <select 
            value={selectedMeal} 
            onChange={(e) => setSelectedMeal(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Meal</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          
          <input
            type="text"
            placeholder="Enter menu item"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Update
          </button>
        </div>
      </div>
    </div>
  );

  const Students = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Management</h2>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">Add New Student</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Student Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Room Number"
              value={newStudent.room}
              onChange={(e) => setNewStudent({...newStudent, room: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddStudent}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Add Student
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meals Taken</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.room}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateMealCount(student.id, false)}
                        className="bg-red-100 text-red-600 px-2 py-1 rounded-full hover:bg-red-200 transition-colors"
                        disabled={student.meals <= 0}
                      >
                        -
                      </button>
                      <span className="font-medium">{student.meals}</span>
                      <button 
                        onClick={() => updateMealCount(student.id, true)}
                        className="bg-green-100 text-green-600 px-2 py-1 rounded-full hover:bg-green-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleStudentStatus(student.id)}
                      className={`mr-4 ${student.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {student.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const Reports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Reports</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Meal Consumption</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Breakfast</span>
                <span className="font-medium">{Math.floor(Math.random() * 150) + 100} meals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lunch</span>
                <span className="font-medium">{Math.floor(Math.random() * 200) + 150} meals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dinner</span>
                <span className="font-medium">{Math.floor(Math.random() * 180) + 120} meals</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{Math.floor(Math.random() * 500) + 400} meals</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Students</span>
                <span className="font-medium">{students.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Students</span>
                <span className="font-medium">{students.filter(s => s.status === 'Active').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Inactive Students</span>
                <span className="font-medium">{students.filter(s => s.status === 'Inactive').length}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold">
                  <span>Average Meals/Student</span>
                  <span>{Math.round(students.reduce((sum, s) => sum + s.meals, 0) / students.length)} meals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-600">Food Cost</p>
              <p className="text-2xl font-bold text-gray-800">₹{Math.floor(Math.random() * 50000) + 100000}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-600">Staff Salary</p>
              <p className="text-2xl font-bold text-gray-800">₹{Math.floor(Math.random() * 20000) + 40000}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-600">Utilities</p>
              <p className="text-2xl font-bold text-gray-800">₹{Math.floor(Math.random() * 10000) + 15000}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-600">Total Expense</p>
              <p className="text-2xl font-bold text-gray-800">₹{Math.floor(Math.random() * 80000) + 160000}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">Mess Management System</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: 'Home' },
              { id: 'menu', name: 'Menu', icon: 'Utensils' },
              { id: 'students', name: 'Students', icon: 'Users' },
              { id: 'reports', name: 'Reports', icon: 'ChartLine' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1"></path>
                </svg>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'menu' && <Menu />}
        {activeTab === 'students' && <Students />}
        {activeTab === 'reports' && <Reports />}
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2025 by Akash Kumar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
