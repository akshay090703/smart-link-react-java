import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { DeleteButton } from "../DeleteModal/DeleteButton";

export function ViewContactHeader() {
    return (
        <DialogHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
                <DialogTitle>Contact Details</DialogTitle>
            </div>
        </DialogHeader>
    );
}