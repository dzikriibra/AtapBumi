import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { downVoteThread, neutralVoteThread, upVoteThread, updateThreadVote } from "../../features/threads/threadsSlice";
import LoginPrompt from "../common/LoginPrompt";
import VoteButton from "../common/VoteButton";

function ThreadVoteActions({ thread }) {
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);
  const { votingThreadId } = useSelector((state) => state.threads);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const userId = user?.id;

  const isUpVoted = Boolean(userId && thread.upVotesBy?.includes(userId));

  const isDownVoted = Boolean(userId && thread.downVotesBy?.includes(userId));

  const isVoting = votingThreadId === thread.id;

  const handleVote = async (voteType) => {
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    let voteAction;

    if (voteType === "up") {
      voteAction = isUpVoted ? neutralVoteThread : upVoteThread;
    }

    if (voteType === "down") {
      voteAction = isDownVoted ? neutralVoteThread : downVoteThread;
    }

    if (!voteAction) {
      return;
    }

    const resultAction = await dispatch(voteAction(thread.id));

    if (voteAction.fulfilled.match(resultAction)) {
      dispatch(updateThreadVote(resultAction.payload));
    }
  };

  return (
    <>
      <div className="mt-4 flex items-center gap-1 border-t border-zinc-800 pt-3">
        <VoteButton
          icon={ThumbsUp}
          count={thread.upVotesBy?.length || 0}
          active={isUpVoted}
          onClick={() => handleVote("up")}
          disabled={isVoting}
          activeLabel="Batalkan like thread"
          inactiveLabel={token ? "Like thread" : "Masuk untuk memberikan vote"}
        />

        <VoteButton
          icon={ThumbsDown}
          count={thread.downVotesBy?.length || 0}
          active={isDownVoted}
          onClick={() => handleVote("down")}
          disabled={isVoting}
          activeLabel="Batalkan unlike thread"
          inactiveLabel={token ? "Unlike thread" : "Masuk untuk memberikan vote"}
        />

        <Link to={`/threads/${thread.id}`} className="ml-1 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-300" aria-label={`${thread.totalComments} komentar`}>
          <MessageCircle size={15} />
          <span>{thread.totalComments}</span>
        </Link>
      </div>

      <LoginPrompt isOpen={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} />
    </>
  );
}

export default ThreadVoteActions;
