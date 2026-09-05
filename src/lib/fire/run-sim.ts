import type { Plan, SimResult } from "./types";

type Job = {
  id: number;
  plan: Plan;
  storyNonce: number;
  resolve: (result: SimResult) => void;
  reject: (err: unknown) => void;
};

let worker: Worker | null = null;
let workerFailed = false;
let seq = 0;
let inflight: Job | null = null;
let queued: Job | null = null;

function abandon(job: Job | null) {
  if (!job) return;
  job.reject(new DOMException("superseded", "AbortError"));
}

function finish(id: number, result: SimResult) {
  const job = inflight;
  inflight = null;
  if (job && job.id === id) job.resolve(result);
  const next = queued;
  queued = null;
  if (next) dispatch(next);
}

function finishError(id: number, err: unknown) {
  const job = inflight;
  inflight = null;
  if (job && job.id === id) job.reject(err);
  const next = queued;
  queued = null;
  if (next) dispatch(next);
}

function dispatch(job: Job) {
  inflight = job;
  if (ensureWorker()) {
    worker!.postMessage({ id: job.id, plan: job.plan, storyNonce: job.storyNonce });
    return;
  }
  void import("./engine").then(({ simulate }) => {
    const run = () => {
      try {
        finish(job.id, simulate(job.plan, job.storyNonce));
      } catch (err) {
        finishError(job.id, err);
      }
    };
    if (typeof window === "undefined") run();
    else window.setTimeout(run, 0);
  });
}

function ensureWorker(): boolean {
  if (typeof window === "undefined" || workerFailed) return false;
  if (worker) return true;
  try {
    worker = new Worker(new URL("./sim.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (event: MessageEvent<{ id: number; ok: boolean; result?: SimResult; error?: string }>) => {
      const data = event.data;
      if (data.ok && data.result) finish(data.id, data.result);
      else finishError(data.id, new Error(data.error || "simulate failed"));
    };
    worker.onerror = () => {
      workerFailed = true;
      worker?.terminate();
      worker = null;
      if (inflight) {
        const job = inflight;
        inflight = null;
        dispatch(job);
      }
    };
    return true;
  } catch {
    workerFailed = true;
    worker = null;
    return false;
  }
}

export function warmupWorker() {
  ensureWorker();
}

export function runSimAsync(plan: Plan, storyNonce: number): Promise<SimResult> {
  const id = ++seq;
  return new Promise((resolve, reject) => {
    const job: Job = { id, plan, storyNonce, resolve, reject };
    if (!inflight) {
      dispatch(job);
      return;
    }
    abandon(queued);
    queued = job;
  });
}
