"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { streamComponent } from "./actions";

function Page() {
  const [component, setComponent] = useState<React.ReactNode>();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setComponent(await streamComponent());
        }}
      >
        <Button>Stream component</Button>
      </form>
      <div>{component}</div>
    </div>
  );
}
export default Page;
