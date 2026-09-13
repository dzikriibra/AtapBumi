import EmptyState from "../common/EmptyState";
import ThreadCard from "./ThreadCard";

function ThreadList({ threads }) {
  if (threads.length === 0) {
    return <EmptyState title="Belum ada diskusi" description="Jadilah yang pertama memulai percakapan di AtapBumi." />;
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
