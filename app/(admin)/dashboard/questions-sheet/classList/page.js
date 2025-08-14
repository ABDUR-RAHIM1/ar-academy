import { getAllClassList } from "@/app/apiActions/classList";
import AddClassForm from "./AddClassList";
import NoData from "@/utils/NoData";
import ViewClassList from "./ViewClassList";

export default async function ClassListPage() {

    const { status, data } = await getAllClassList();

    if (status !== 200 || !data) {
        return <NoData text={"কিছু পাওয়া যায়নি "} />
    }

    return (
        <div className=" px-3 min-h-screen bg-gray-50 overflow-hidden">
            <AddClassForm />

            <ViewClassList data={data} />
        </div>
    );
}
