import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex gap-10 items-center justify-center w-full min-h-screen bg-red-100">
      hello world
      <Button size={"lg"} variant="default">
        click me
      </Button>
    </div>
  );
}
