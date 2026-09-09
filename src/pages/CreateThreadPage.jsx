import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createThread } from "../features/threads/threadsSlice";

function CreateThreadPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createStatus, createError } = useSelector((state) => state.threads);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resultAction = await dispatch(
      createThread({
        title,
        body,
        category,
      }),
    );

    if (createThread.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  const isSubmitting = createStatus === "loading";

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-white">Buat Thread</h1>

        <p className="mt-2 text-sm text-zinc-400">Bagikan cerita, pengalaman, atau pertanyaanmu.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-zinc-300">
              Judul
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-zinc-600"
              placeholder="Judul thread..."
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-zinc-300">
              Kategori
            </label>

            <input
              id="category"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-zinc-600"
              placeholder="Contoh: pendakian"
            />
          </div>

          <div>
            <label htmlFor="body" className="mb-2 block text-sm font-medium text-zinc-300">
              Isi Thread
            </label>

            <textarea
              id="body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              required
              rows="8"
              className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-zinc-600"
              placeholder="Tulis isi thread..."
            />
          </div>

          {createStatus === "failed" && <p className="text-sm text-red-400">{createError}</p>}

          <button type="submit" disabled={isSubmitting} className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting ? "Membuat thread..." : "Buat Thread"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreateThreadPage;
