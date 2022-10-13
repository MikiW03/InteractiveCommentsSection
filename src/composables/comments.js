import syncDate from "./syncDate";

export default function useComments(data) {
  function comment(e, content) {
    addComment(e, content, "", false);
  }

  function reply(e, content, replyingTo, ogId) {
    addComment(e, content, replyingTo, true, ogId);
  }

  function addComment(e, content, replyingTo, reply, ogId = undefined) {
    const id = Math.floor(Math.random() * Date.now());
    const comment = {
      id: id,
      date: new Date(),
      createdAt: new Date().toLocaleString("en-us", {
        dateStyle: "long",
        timeStyle: "short",
      }),
      content: content,
      replyingTo: replyingTo,
      score: 0,
      replies: [],
      user: data.value.currentUser,
    };

    if (!reply) {
      data.value.comments.push(comment);
    } else {
      data.value.comments[
        data.value.comments.findIndex((obj) => obj.id === ogId)
      ].replies.push(comment);
    }

    syncDate(data);
  }

  function edit(ogId, comment, content) {
    const isReply = ogId != comment.id;
    if (!isReply) {
      data.value.comments[
        data.value.comments.findIndex((obj) => obj.id === ogId)
      ].content = content;
    } else {
      data.value.comments[
        data.value.comments.findIndex((obj) => obj.id === ogId)
      ].replies[
        data.value.comments[
          data.value.comments.findIndex((obj) => obj.id === ogId)
        ].replies.findIndex((obj) => obj.id === comment.id)
      ].content = content;
    }
  }

  function remove(comment, ogId) {
    const isReply = ogId != comment.id;
    if (!isReply) {
      data.value.comments.splice(
        data.value.comments.findIndex((obj) => obj.id === ogId),
        1,
      );
    } else {
      data.value.comments[
        data.value.comments.findIndex((obj) => obj.id === ogId)
      ].replies.splice(
        data.value.comments[
          data.value.comments.findIndex((obj) => obj.id === ogId)
        ].replies.findIndex((obj) => obj.id === comment.id),
        1,
      );
    }
  }

  function incrementScore(comment, ogId) {
    const isReply = ogId != comment.id;
    if (!isReply) {
      data.value.comments[
        data.value.comments.findIndex((obj) => obj.id === ogId)
      ].score++;
    } else {
      data.value.comments[
        data.value.comments.findIndex((obj) => obj.id === ogId)
      ].replies[
        data.value.comments[
          data.value.comments.findIndex((obj) => obj.id === ogId)
        ].replies.findIndex((obj) => obj.id === comment.id)
      ].score++;
    }
  }

  function decrementScore(comment, ogId) {
    const isReply = ogId != comment.id;
    if (!isReply) {
      data.value.comments[
        data.value.comments.findIndex((obj) => obj.id === ogId)
      ].score--;
    } else {
      data.value.comments[
        data.value.comments.findIndex((obj) => obj.id === ogId)
      ].replies[
        data.value.comments[
          data.value.comments.findIndex((obj) => obj.id === ogId)
        ].replies.findIndex((obj) => obj.id === comment.id)
      ].score--;
    }
  }

  return {
    comment,
    reply,
    remove,
    edit,
    incrementScore,
    decrementScore,
  };
}
