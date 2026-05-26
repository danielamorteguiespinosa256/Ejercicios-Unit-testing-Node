const TaskManager = require('../src/taskManager');

describe('Pruebas para TaskManager', () => {
  let manager;

  // Se ejecuta antes de cada test para garantizar un entorno limpio y aislado
  beforeEach(() => {
    manager = new TaskManager();
  });

  // ==========================================
  // Tests: Creación y Estado Inicial
  // ==========================================
  test('Una tarea recién creada tiene completed: false', () => {
    const task = manager.addTask('Aprender Testing con Jest');
    expect(task.completed).toBe(false);
    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('createdAt');
  });

  test('Después de addTask, el total de tareas aumenta en 1', () => {
    expect(manager.getAll().length).toBe(0);
    manager.addTask('Primera tarea');
    expect(manager.getAll().length).toBe(1);
    manager.addTask('Segunda tarea');
    expect(manager.getAll().length).toBe(2);
  });

  // ==========================================
  // Tests: Actualización y Eliminación
  // ==========================================
  test('completeTask cambia el estado correctamente sin afectar otras tareas', () => {
    const task1 = manager.addTask('Tarea 1');
    const task2 = manager.addTask('Tarea 2');

    manager.completeTask(task1.id);

    expect(task1.completed).toBe(true);
    expect(task2.completed).toBe(false); // No se debió alterar
  });

  test('removeTask disminuye el total de tareas', () => {
    const task1 = manager.addTask('Eliminar esta');
    const task2 = manager.addTask('Mantener esta');
    
    expect(manager.getAll().length).toBe(2);
    manager.removeTask(task1.id);
    
    expect(manager.getAll().length).toBe(1);
    expect(manager.getAll()[0].id).toBe(task2.id);
  });

  // ==========================================
  // Tests: Filtros de Estado
  // ==========================================
  test('getPending() no incluye tareas completadas', () => {
    const task1 = manager.addTask('Pendiente 1');
    const task2 = manager.addTask('Pendiente 2');
    manager.completeTask(task1.id);

    const pending = manager.getPending();
    expect(pending.length).toBe(1);
    expect(pending[0].id).toBe(task2.id);
  });

  test('getCompleted() no incluye tareas pendientes', () => {
    const task1 = manager.addTask('Completada 1');
    manager.addTask('Pendiente');
    manager.completeTask(task1.id);

    const completed = manager.getCompleted();
    expect(completed.length).toBe(1);
    expect(completed[0].id).toBe(task1.id);
  });

  // ==========================================
  // Tests: Casos Borde y Manejo de Errores
  // ==========================================
  test('Los métodos que reciben un id inválido lanzan error', () => {
    expect(() => manager.completeTask(999)).toThrow(Error);
    expect(() => manager.removeTask(999)).toThrow(Error);
  });

  test('addTask con title vacío lanza error', () => {
    expect(() => manager.addTask('')).toThrow(Error);
    expect(() => manager.addTask('   ')).toThrow(Error);
  });
});