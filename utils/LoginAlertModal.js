import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LoginAlertModal({ open, setOpen, text, onRedirect }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-red-500 text-lg">
                        🔒 লগইন করা হয়নি
                    </DialogTitle>
                </DialogHeader>
                <p className="text-gray-700">
                    {text}
                </p>
                <DialogFooter className={"flex items-center justify-between flex-wrap gap-2"}>
                    <Button className={" w-full"} variant="default" onClick={onRedirect}>লগইন</Button>
                    <Button className={" w-full"} variant="outline" onClick={() => setOpen(false)}> এখন না</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
