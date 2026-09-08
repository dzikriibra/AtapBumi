import ThreadCard from "./ThreadCard";

function ThreadList({ threads }) {
  if (threads.length === 0) {
    return <p className="text-center text-zinc-500">Belum ada thread.</p>;
  }

  return (
    <section className="grid gap-4">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </section>
  );
}

export default ThreadList;
