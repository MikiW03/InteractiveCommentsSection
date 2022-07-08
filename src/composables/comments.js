export default function useComments(data) {
  function comment(e, content) {
    addComment(e, content, "", false);
  }

  function reply(e, content, replyingTo, id) {
    addComment(e, content, replyingTo, true, id);
  }

  function addComment(e, content, replyingTo, reply, OGid = undefined) {
    console.log(OGid);
    const id = !replyingTo
      ? data.value.comments.length + 1
      : `${OGid.split(".")[0]}.${
          data.value.comments[OGid.split(".")[0] - 1].replies.length + 1
        }`;

    const comment = {
      id: String(id),
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
      e.currentTarget.parentElement.childNodes[0].value = "";
    } else {
      data.value.comments[OGid.split(".")[0] - 1].replies.push(comment);
      e.currentTarget.parentElement.childNodes[1].value = "";
    }
  }

  function remove(id) {
    console.log(id);
    const isReply = id.split(".").length > 1;
    if (!isReply) {
      data.value.comments.splice([id.split(".")[0] - 1], 1);
    } else {
      data.value.comments[id.split(".")[0] - 1].replies.splice(
        [id.split(".")[1]] - 1,
        1,
      );
    }
  }

  return {
    comment,
    reply,
    remove,
  };
}
