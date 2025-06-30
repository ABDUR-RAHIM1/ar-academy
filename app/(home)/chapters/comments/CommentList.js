import { getCommentsByChapterId } from '@/app/apiActions/comments';

export default async function CommentList({ chapterId }) {
    const { status, data } = await getCommentsByChapterId(chapterId);

    // console.log("comemntLis", status, data)
    return (
        <div>CommentList</div>
    )
}
