import { useState } from "react";

// Reuse Todo type (better: move this to a shared types.ts file)
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type AddTodoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: Todo) => void;
};

export default function AddTodoModal({ isOpen, onClose, onAdd }: AddTodoModalProps) {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;

    const newTodo: Omit<Todo, "id"> = {
      userId: 1, // Required by JSONPlaceholder
      title,
      completed: false,
    };

    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    const data = await res.json();
    // Create a unique id locally since JSONPlaceholder doesn’t persist new todos
    onAdd({ ...data, id: Date.now() });
    setTitle("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
