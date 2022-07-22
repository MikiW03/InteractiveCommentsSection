import { useTimeAgo } from "@vueuse/core";

export default function syncDate(data) {
  function sync() {
    [...data.value.comments].forEach((comment) => {
      if (comment.date) {
        comment.createdAt = useTimeAgo(comment.date);
      }
      comment.replies.forEach((reply) => {
        if (reply.date) {
          reply.createdAt = useTimeAgo(reply.date);
        }
      });
    });
  }

  sync();
  setInterval(sync, 60000);
}
