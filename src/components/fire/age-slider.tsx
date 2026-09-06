import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatAge } from "@/lib/fire/format";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";

const AGE_MIN = 18;
const AGE_MAX = 110;

type Thumb = "now" | "fire" | "end";

function pct(age: number) {
  return ((age - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100;
}

function ageFromX(clientX: number, rect: DOMRect) {
  const t = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  return Math.round(AGE_MIN + t * (AGE_MAX - AGE_MIN));
}

/** 現在 ≦ FIRE ＜ 終了年齢 */
function clampTrio(
  currentAge: number,
  fireAge: number,
  endAge: number,
  edited: Thumb,
): { currentAge: number; fireAge: number; endAge: number } {
  let now = Math.round(currentAge);
  let fire = Math.round(fireAge);
  let end = Math.round(endAge);

  now = Math.min(AGE_MAX - 1, Math.max(AGE_MIN, now));
  fire = Math.min(AGE_MAX - 1, Math.max(AGE_MIN, fire));
  end = Math.min(AGE_MAX, Math.max(AGE_MIN + 1, end));

  if (edited === "now") {
    if (now > fire) fire = now;
    if (fire >= end) end = fire + 1;
  } else if (edited === "fire") {
    if (fire < now) fire = now;
    if (fire >= end) end = fire + 1;
  } else {
    if (end <= fire) fire = end - 1;
    if (fire < now) now = fire;
  }

  if (end > AGE_MAX) {
    end = AGE_MAX;
    fire = Math.min(fire, end - 1);
    now = Math.min(now, fire);
  }
  return { currentAge: now, fireAge: fire, endAge: end };
}

export function AgeSlider({ compact = false, onRun }: { compact?: boolean; onRun?: () => void }) {
  const plan = usePlanStore((s) => s.plan);
  const patchPlan = usePlanStore((s) => s.patchPlan);
  const status = usePlanStore((s) => s.status);
  const run = usePlanStore((s) => s.run);
  const trackRef = useRef<HTMLDivElement>(null);
  const planRef = useRef(plan);
  planRef.current = plan;
  const dragRef = useRef<Thumb | null>(null);

  const now = Math.round(plan.currentAge);
  const fire = Math.round(plan.fireAge);
  const end = Math.round(plan.endAge);
  const pension = Math.round(plan.pensionAge);
  const accumYears = Math.max(0, fire - now);
  const wdYears = Math.max(0, end - fire);

  const apply = (thumb: Thumb, raw: number) => {
    const p = planRef.current;
    const next = clampTrio(
      thumb === "now" ? raw : p.currentAge,
      thumb === "fire" ? raw : p.fireAge,
      thumb === "end" ? raw : p.endAge,
      thumb,
    );
    patchPlan(next);
  };

  const onPointerDown = (thumb: Thumb, e: PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = thumb;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const rect = trackRef.current?.getBoundingClientRect();
    if (rect) apply(thumb, ageFromX(e.clientX, rect));
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragRef.current) return;
    const rect = trackRef.current?.getBoundingClientRect();
    if (rect) apply(dragRef.current, ageFromX(e.clientX, rect));
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const onTrackPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget && !(e.target as HTMLElement).dataset.track) return;
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const age = ageFromX(e.clientX, rect);
    const dist: [Thumb, number][] = [
      ["now", Math.abs(age - now)],
      ["fire", Math.abs(age - fire)],
      ["end", Math.abs(age - end)],
    ];
    dist.sort((a, b) => a[1] - b[1]);
    const thumb = dist[0]![0];
    dragRef.current = thumb;
    e.currentTarget.setPointerCapture(e.pointerId);
    apply(thumb, age);
  };

  const overlap = now === fire;

  return (
    <div className="min-w-0">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-base text-fg">人生の区切り</h3>
        <p className="text-xs tabular-nums text-fg-subtle">
          形成 {accumYears}年 · 取崩 {wdYears}年
        </p>
      </div>

      <div
        ref={trackRef}
        data-track="1"
        className={cn(
          "relative mt-4 h-11 cursor-pointer touch-none select-none",
          compact && "hidden",
        )}
        onPointerDown={onTrackPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          data-track="1"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-bg-sunken"
        />
        <div
          className="pointer-events-none absolute top-1/2 h-2 -translate-y-1/2 rounded-l-full bg-accent-soft"
          style={{ left: `${pct(now)}%`, width: `${Math.max(0, pct(fire) - pct(now))}%` }}
        />
        <div
          className="pointer-events-none absolute top-1/2 h-2 -translate-y-1/2 rounded-r-full bg-phase-withdraw"
          style={{ left: `${pct(fire)}%`, width: `${Math.max(0, pct(end) - pct(fire))}%` }}
        />
        {plan.annualPension > 0 && pension >= now && pension < end ? (
          <span
            className="pointer-events-none absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fire"
            style={{ left: `${pct(pension)}%` }}
            title={`年金 ${formatAge(pension)}`}
          />
        ) : null}
        <ThumbHandle
          thumb="now"
          age={now}
          label="今"
          className="bg-fg z-20"
          nudge={overlap ? -6 : 0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
        <ThumbHandle
          thumb="fire"
          age={fire}
          label="FIRE"
          className="bg-fire z-30"
          nudge={overlap ? 6 : 0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
        <ThumbHandle
          thumb="end"
          age={end}
          label="終了"
          className="bg-fg-muted z-20"
          nudge={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      </div>

      <div className={cn("mt-1 flex justify-between text-[11px] text-fg-muted", compact && "hidden")}>
        <span>{AGE_MIN}</span>
        <span>{AGE_MAX}</span>
      </div>

      <div
        className={cn(
          "mt-3",
          compact
            ? "grid grid-cols-[3.5rem_3.5rem_minmax(0,1fr)] items-end gap-2 min-[1400px]:grid-cols-[3.5rem_3.5rem_6.75rem_minmax(0,1fr)_minmax(0,1fr)]"
            : "flex flex-nowrap items-end gap-2 sm:gap-4",
        )}
      >
        <AgeField label="現在" value={now} onCommit={(v) => apply("now", v)} />
        <AgeField label="FIRE" value={fire} onCommit={(v) => apply("fire", v)} />
        <AgeField
          label={"シミュレーション\n終了年齢"}
          value={end}
          onCommit={(v) => apply("end", v)}
          wide
        />
        <div
          className={cn(
            compact
              ? "col-span-3 mt-1 grid grid-cols-1 gap-2 min-[1400px]:col-span-2 min-[1400px]:mt-0"
              : "ml-auto flex shrink-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2",
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn("px-2.5 text-xs sm:px-3 sm:text-sm", compact && "w-full")}
            onClick={onRun ?? run}
          >
            {status === "running" ? "計算中" : compact ? "計算" : "再計算"}
          </Button>
        </div>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-fg-subtle">
        {compact
          ? "現在 ≦ FIRE ＜ 終了年齢。数字は欄を出たときに反映する。"
          : "現在 ≦ FIRE ＜ シミュレーション終了年齢。すでに取り崩し中なら現在＝FIRE。数字は書き終わって欄を出たときに反映する。"}
      </p>
    </div>
  );
}

function AgeField({
  label,
  value,
  onCommit,
  wide,
}: {
  label: string;
  value: number;
  onCommit: (n: number) => void;
  wide?: boolean;
}) {
  const [text, setText] = useState(String(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setText(String(value));
  }, [value, focused]);

  const commit = () => {
    const n = Number(text);
    if (!Number.isFinite(n) || text.trim() === "") {
      setText(String(value));
      return;
    }
    onCommit(Math.round(n));
  };

  return (
    <label className={cn("flex shrink-0 flex-col gap-1.5", wide ? "w-[6.75rem]" : "w-14")}>
      <span className="flex h-8 items-end text-xs font-medium leading-tight whitespace-pre-line text-fg-muted">
        {label}
      </span>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        className="w-14 px-1 text-center"
        value={focused ? text : String(value)}
        onFocus={(e) => {
          setFocused(true);
          setText(String(value));
          e.currentTarget.select();
        }}
        onChange={(e) => setText(e.target.value.replace(/[^\d]/g, "").slice(0, 3))}
        onBlur={() => {
          setFocused(false);
          commit();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
      />
    </label>
  );
}

function ThumbHandle({
  thumb,
  age,
  label,
  className,
  nudge,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  thumb: Thumb;
  age: number;
  label: string;
  className: string;
  nudge: number;
  onPointerDown: (thumb: Thumb, e: PointerEvent) => void;
  onPointerMove: (e: PointerEvent) => void;
  onPointerUp: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`${label} ${formatAge(age)}`}
      className="absolute top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 touch-none items-center justify-center"
      style={{ left: `calc(${pct(age)}% + ${nudge}px)` }}
      onPointerDown={(e) => onPointerDown(thumb, e)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span
        className={cn("block size-3.5 rounded-full shadow-[var(--shadow-border)]", className)}
      />
      <span className="pointer-events-none absolute -top-4 whitespace-nowrap text-[10px] font-medium tabular-nums text-fg">
        {formatAge(age)}
      </span>
    </button>
  );
}
