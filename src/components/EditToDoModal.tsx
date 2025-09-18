import { useState, useEffect } from "react";

// Reuse the same Todo type (ideally move to types.ts)
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type EditTodoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
  onUpdate: (todo: Todo) => void;
};

export default function EditTodoModal({
  isOpen,
  onClose,
  todo,
  onUpdate,
}: EditTodoModalProps) {
  const [title, setTitle] = useState<string>(todo?.title || "");
  const [completed, setCompleted] = useState<boolean>(todo?.completed || false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return; // safeguard if todo is null

    const updatedTodo: Todo = {
      ...todo,
      title,
      completed,
    };

    await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });

    onUpdate(updatedTodo);
    onClose();
  };

  if (!isOpen || !todo) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
