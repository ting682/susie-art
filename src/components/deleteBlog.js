import { useDispatch } from 'react-redux'

export const DeleteBlog = (props) => {

    const dispatch = useDispatch()

    const blogId = props.blogId

    

    return (
        <Button onClick={handleClick}>Delete entry</Button>
    )
}