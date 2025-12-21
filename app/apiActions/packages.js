import { getsActions } from "@/actions/users/getActions"
import { packageGetAll } from "@/constans"

export const getAllPackagesByAll = async () => {
    const packages = await getsActions(packageGetAll);
    return packages
}