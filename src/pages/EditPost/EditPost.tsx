// libraries
import { useState } from "react"
import { useHistory } from "react-router-dom"
// hooks
import { useSelector, useDispatch } from "app/hooks"
// actions
import { postUpdated, selectPostById, Post } from "slices/posts"
// styles
import { Section } from "./styles"

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>
type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>

const EditPost = ({ match }: { match: any }) => {
  const { postId } = match.params

  const users = useSelector((state) => state.users)
  const post = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)
  const [userId, setUserId] = useState(post?.user)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = (e: InputChangeEvent) => setTitle(e.target.value)
  const onContentChanged = (e: TextAreaChangeEvent) =>
    setContent(e.target.value)
  const onAuthorChanged = (e: SelectChangeEvent) => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (title && content && userId) {
      dispatch(
        postUpdated({ id: postId, title, content, user: userId } as Post)
      )
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <Section>
      <h2>Edit Post</h2>
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
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </Section>
  )
}

export default EditPost
