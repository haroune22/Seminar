import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex gap-10 items-center justify-center w-full min-h-screen">
      hello world
      <Button size={"lg"} variant="default">
        click me
      </Button>
    </div>
  );
};

export default Home;
