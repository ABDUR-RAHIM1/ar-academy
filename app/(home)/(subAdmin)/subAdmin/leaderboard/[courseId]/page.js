import { getLeaderBoardData } from "@/app/apiActions/leaderboard";
import LeaderBoardDetails from "@/components/LeaderBoardDetails";
 
//  for admin Dashboard
export default async function Leaderboard({ params }) {
    const { courseId } = await params;
    const { status, data } = await getLeaderBoardData(courseId);
 
    if (!status || !data || !data.leaderboard) {
        return (
            <div className="p-5 text-center text-red-500">
                No leaderboard data found for this course.
            </div>
        );
    }

    const leaderboard = data.leaderboard;

    return <LeaderBoardDetails leaderboardData={leaderboard} />
}
