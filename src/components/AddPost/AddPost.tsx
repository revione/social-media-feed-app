// libraries
import React, { useState } from "react"
import { nanoid } from "@reduxjs/toolkit"
// hooks
import { useDispatch } from "app/hooks"
// actions
import { postAdded } from "features/posts/slice"
// styles
import { Section } from "./styles"

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>

const AddPostForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const onTitleChanged = (e: InputChangeEvent) => setTitle(e.target.value)
  const onContentChanged = (e: TextAreaChangeEvent) =>
    setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        })
      )

      setTitle("")
      setContent("")
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
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </Section>
  )
}

export default AddPostForm
