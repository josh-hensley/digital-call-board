interface commentUser {
    id: number,
    firstName: string,
    lastName: string
}

export default interface CommentProps {
    id: number;
    content: string;
    User: commentUser;
    createdAt: string;
}