import { getsActions } from "@/actions/users/getActions"
import { getLeaderboarByCourse } from "@/constans";

export const getLeaderBoardData = async (courseId) => {
    const leaderboard = await getsActions(getLeaderboarByCourse + courseId);
    return leaderboard;
}