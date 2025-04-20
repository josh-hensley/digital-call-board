import CommentProps from './CommentProps';

export default interface PostProps {
    _id: string;
    postAuthor: string;
    postText: string;
    createdAt: string;
    comments: CommentProps[];
}