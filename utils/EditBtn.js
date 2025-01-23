import { Button, buttonVariants } from "@/components/ui/button";

export function EditBtn() {
    return (
        <Button
            className={buttonVariants({ size: "sm"  })}
        >
            Edit
        </Button>
    );
}
