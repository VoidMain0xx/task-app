import React from 'react';
import axios from 'axios';

// Define the component
const Tasks = () => {
  const [projects, setProjects] = React.useState([]);

  // Fetch data from axios
  React.useEffect(() => {
    axios.get('http://localhost:3100/api/task/tasks/') // Replace '/api/tasks' with your actual endpoint
      .then(response => {setProjects(response.data) 
        console.log(response.data)
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3100/api/task/tasks/${id}`); // Correct endpoint for delete
      setProjects(projects.filter(project => project._id !== id)); // Update local state
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Function to handle edit (placeholder, replace with actual edit logic)
  const handleEdit = (project) => {
    console.log('Edit project:', project);
    // You can navigate or open a modal for editing
    // e.g., navigate('/edit-project', { state: { project } });
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Project List</h2>
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Title</th>
            <th className="border border-gray-400 px-4 py-2">Description</th>
            <th className="border border-gray-400 px-4 py-2">Due Date</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
            <th className="border border-gray-400 px-4 py-2">Priority</th>
            <th className="border border-gray-400 px-4 py-2">User ID</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project._id}>
              <td className="border border-gray-400 px-4 py-2">{project.title}</td>
              <td className="border border-gray-400 px-4 py-2">{project.description}</td>
              <td className="border border-gray-400 px-4 py-2">{new Date(project.dueDate).toLocaleDateString()}</td>
              <td className="border border-gray-400 px-4 py-2">{project.status}</td>
              <td className="border border-gray-400 px-4 py-2">{project.priority}</td>
              <td className="border border-gray-400 px-4 py-2">{project.user}</td>
              <td className="border border-gray-400 px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
