import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

function ForumLayout({ children }) {
  return (
    <div className="px-6 py-8">
      <div className="flex gap-6">
        <LeftSidebar />

        <main className="min-w-0 flex-1">{children}</main>

        <RightSidebar />
      </div>
    </div>
  );
}

export default ForumLayout;
