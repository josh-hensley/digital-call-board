import CommentProps from "./CommentProps"

interface postUser {
    id: number,
    firstName: string,
    lastName: string
}

export default interface PostProps {
    id: string;
    content: string;
    User: postUser;
    createdAt: string;
    Comments: CommentProps[];
}