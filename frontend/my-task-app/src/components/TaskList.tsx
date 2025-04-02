import { useState, useEffect } from 'react';
import { Trash, Edit, X, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../styles/TaskList.css'; 

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  deadline?: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const textarea = document.querySelector('.auto-resize-textarea') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [description]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Erro ao carregar tarefas');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Sem prazo';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCreateTask = async () => {
    try {
      const newTask = { 
        title, 
        description, 
        status: 'pendente',
        deadline: deadline || undefined
      };
      await api.post('/tasks', newTask);
      setTitle('');
      setDescription('');
      setDeadline('');
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError('Erro ao criar tarefa');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Erro ao excluir tarefa');
    }
  };

  const handleCompleteTask = async (id: string) => {
    try {
      const updatedTask = tasks.find(task => task._id === id);
      if (!updatedTask) return;

      const newStatus = updatedTask.status === 'pendente' ? 'concluída' : 'pendente';
      await api.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      setError('Erro ao alterar status da tarefa');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDeadline(task.deadline || '');
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setDeadline('');
    setShowForm(false);
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;
    try {
      const updatedData = { 
        title, 
        description, 
        deadline: deadline || undefined
      };
      await api.put(`/tasks/${editingTask._id}`, updatedData);
      fetchTasks();
      setEditingTask(null);
      setTitle('');
      setDescription('');
      setDeadline('');
      setShowForm(false);
    } catch (err) {
      setError('Erro ao editar tarefa');
    }
  };

  const handleBackToLogin = () => {
    if (window.confirm('Deseja sair e voltar para a tela de login?')) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <div className="app-container">
      {/* Wrapper para o título e os botões */}
      <div className="header">
        <button
          onClick={handleBackToLogin}
          className="back-btn flex items-center gap-2"
        >
          <ArrowLeft size={12} /> Voltar
        </button>

        <h2>Notas</h2>
        {!showForm && !editingTask && (
          <button
            onClick={() => setShowForm(true)}
            className="add-task-btn flex items-center gap-2"
          >
            <Plus size={12} /> Nova Nota
          </button>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {/* Formulário (visível apenas quando showForm for true ou ao editar) */}
      {(showForm || editingTask) && (
        <div className="task-form">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="auto-resize-textarea"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Prazo"
          />
          {editingTask ? (
            <div className="edit-actions">
              <button onClick={handleUpdateTask} className="update-task-btn">Salvar</button>
              <button onClick={handleCancelEdit} className="cancel-edit-btn">
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="edit-actions">
              <button onClick={handleCreateTask} className="add-task-btn">Adicionar Nota</button>
              <button onClick={handleCancelEdit} className="cancel-edit-btn">
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className="task-deadline">Prazo: {formatDate(task.deadline)}</p>

            <div className="task-actions">
              <button
                className={task.status === 'concluída' ? 'complete-btn completed' : 'complete-btn'}
                onClick={() => handleCompleteTask(task._id)}
              >
                {task.status === 'concluída' ? '✅ Concluída' : 'Marcar como concluída'}
              </button>

              <button className="edit-btn" onClick={() => handleEditTask(task)}>
                <Edit size={16} />
              </button>

              <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;