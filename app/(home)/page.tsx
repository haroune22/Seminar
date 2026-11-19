import Test from "@/components/test";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

const Home = () => {
  return (
    <div className="flex gap-10 items-center justify-center w-full min-h-screen">
      hello world
      <Button size={"lg"} variant="default">
        click me
      </Button>
      <Suspense fallback={<div>Loading slow data</div>}>
        <Test />
      </Suspense>
    </div>
  );
};

export default Home;
