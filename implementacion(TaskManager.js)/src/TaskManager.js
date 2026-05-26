class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentId = 1; // Contador para generar IDs únicos correlativos
  }

  // ==========================================
  // Método — addTask(title)
  // ==========================================
  addTask(title) {
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('El título de la tarea no puede estar vacío.');
    }

    const newTask = {
      id: this.currentId++,
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };

    this.tasks.push(newTask);
    return newTask;
  }

  // ==========================================
  // Método — completeTask(id)
  // ==========================================
  completeTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      throw new Error(`No se encontró ninguna tarea con el ID: ${id}`);
    }
    task.completed = true;
    return task;
  }

  // ==========================================
  // Método — removeTask(id)
  // ==========================================
  removeTask(id) {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error(`No se encontró ninguna tarea con el ID: ${id}`);
    }
    this.tasks.splice(taskIndex, 1);
  }

  // ==========================================
  // Método — getPending()
  // ==========================================
  getPending() {
    return this.tasks.filter(t => !t.completed);
  }

  // ==========================================
  // Método — getCompleted()
  // ==========================================
  getCompleted() {
    return this.tasks.filter(t => t.completed);
  }

  // ==========================================
  // Método — getAll()
  // ==========================================
  getAll() {
    return [...this.tasks]; // Retorna una copia para evitar mutaciones externas directas
  }
}

module.exports = TaskManager;