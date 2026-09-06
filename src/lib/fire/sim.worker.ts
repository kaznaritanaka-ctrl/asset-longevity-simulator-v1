import { simulate } from "./engine";
import type { Plan } from "./types";

type In = { id: number; plan: Plan; storyNonce: number };

self.onmessage = (event: MessageEvent<In>) => {
  const { id, plan, storyNonce } = event.data;
  try {
    const result = simulate(plan, storyNonce);
    self.postMessage({ id, ok: true, result });
  } catch (err) {
    self.postMessage({
      id,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
