import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import AddTodoModal from "../components/AddTodoModal";
import EditToDoModal from "../components/EditToDoModal";

// Type for a Todo item
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function ToDo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "incomplete">("all");

  const TODOS_PER_PAGE = 10;

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data: Todo[]) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleDelete = async (todoId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo item?"
    );
    if (!confirmDelete) return;

    await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      method: "DELETE",
    });

    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    showSuccess("Todo deleted successfully!");
  };

  useEffect(() => {
    let filtered = todos;

    // Filter by search
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by completion status
    if (filterStatus === "completed") {
      filtered = filtered.filter((todo) => todo.completed);
    } else if (filterStatus === "incomplete") {
      filtered = filtered.filter((todo) => !todo.completed);
    }

    setFilteredTodos(filtered);
    setCurrentPage(1); // Reset to first page whenever filter/search changes
  }, [todos, searchQuery, filterStatus]);

  const indexOfLastTodo = currentPage * TODOS_PER_PAGE;
  const indexOfFirstTodo = indexOfLastTodo - TODOS_PER_PAGE;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(filteredTodos.length / TODOS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/*Header section of todo app */}
      <header className="flex items-center justify-between p-4 border-b bg-emerald-500">
        <h1 className="text-2xl font-bold text-white">ToDo</h1>
        {/*Button to add a new item*/}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="p-2 rounded-full bg-white hover:bg-slate-200 text-emerald-500 cursor-pointer"
        >
          <Plus className="h-5 w-5" />
        </button>
      </header>

      {/*Body of the code*/}
      <main className="max-w-3xl mx-auto p-4">
        {/* display Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-300 text-center">
            {successMessage}
          </div>
        )}
        <h2 className="text-xl font-semibold mb-4">Todo List</h2>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded border w-full"
          />

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {["all", "completed", "incomplete"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as "all" | "completed" | "incomplete")}
                className={`px-3 py-1 rounded ${
                  filterStatus === status
                    ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/*return message if no item meet search*/}
        {loading ? (
          <p>Loading todos...</p>
        ) : filteredTodos.length === 0 ? (
          <p className="text-gray-500">No todos match your search/filter.</p>
        ) : (
          <>
            <ul className="space-y-3">
              {currentTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex justify-between items-center p-3 bg-white rounded shadow"
                >
                  <Link
                    to={`/todos/${todo.id}`}
                    className="flex-1 hover:underline"
                  >
                    <p className="font-medium">{todo.title}</p>
                    <p
                      className={`text-sm ${
                        todo.completed ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Not completed"}
                    </p>
                  </Link>
                  {/*Button to edit an item*/}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditTodo(todo)}
                      className="text-sm text-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    {/*Button to delete an item*/}
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="text-sm text-red-500 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded mx-2 ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-gray-300 cursor-pointer"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300  cursor-pointer"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newTodo: Todo) => {
          setTodos((prev) => [newTodo, ...prev]);
          showSuccess("Todo added successfully!");
        }}
      />
      <EditToDoModal
        isOpen={!!editTodo}
        onClose={() => setEditTodo(null)}
        todo={editTodo}
        onUpdate={(updatedTodo: Todo) => {
          setTodos((prev) =>
            prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
          );
          showSuccess("Todo updated successfully!");
        }}
      />
    </div>
  );
}
