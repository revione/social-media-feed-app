// libraries
import React, { useState } from "react"
// hooks
import { useSelector, useDispatch } from "app/hooks"
// actions
import { addNewPost } from "features/posts/slice"
// styles
import { Section } from "./styles"

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>
type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>

const AddPostForm = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const [addRequestStatus, setAddRequestStatus] = useState("idle")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle"

  const onTitleChanged = (e: InputChangeEvent) => setTitle(e.target.value)
  const onContentChanged = (e: TextAreaChangeEvent) =>
    setContent(e.target.value)
  const onAuthorChanged = (e: SelectChangeEvent) => setUserId(e.target.value)

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending")
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle("")
        setContent("")
        setUserId("")
      } catch (err) {
        console.error("Failed to save the post: ", err)
      } finally {
        setAddRequestStatus("idle")
      }
    }
  }

  return (
    <Section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </Section>
  )
}

export default AddPostForm
