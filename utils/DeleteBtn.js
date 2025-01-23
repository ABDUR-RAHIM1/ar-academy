import { Button, buttonVariants } from "@/components/ui/button";

export function DeleteBtn() {
  return (
    <Button
      className={buttonVariants({ size: "sm", variant: "destructive" })}
    >
      Delete
    </Button>
  );
}
