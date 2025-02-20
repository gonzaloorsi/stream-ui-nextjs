"use server";

import { streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

function LoadingComponent() {
  return <div className="animate-pulse p-4">Loading...</div>;
}

async function getWeather(location: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return "82F ☀️";
}

interface WeatherProps {
  location: string;
  weather: string;
}

function WeatherComponent(props: WeatherProps) {
  return (
    <div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
      The weather in {props.location} is {props.weather}
    </div>
  );
}

export async function streamComponent() {
  const result = await streamUI({
    model: openai("gpt-4o"),
    prompt: "What is the weather in San Francisco?",
    text: ({ content }) => <div>{content}</div>,
    tools: {
      getWeather: {
        description: "Get the weather for a location",
        parameters: z.object({ location: z.string() }),
        generate: async function* ({ location }) {
          yield <LoadingComponent />;
          const weather = await getWeather(location);
          return <WeatherComponent location={location} weather={weather} />;
        },
      },
    },
  });

  return result.value;
}
