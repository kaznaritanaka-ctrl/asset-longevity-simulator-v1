import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/field";
import { Input, Select } from "@/components/ui/input";
import { RUIN_TYPE_LABEL, type RuinRule } from "@/lib/fire/types";
import { usePlanStore } from "@/store/plan-store";

export function RuinEditor({
  embedded = false,
  plain = false,
}: {
  embedded?: boolean;
  plain?: boolean;
}) {
  const plan = usePlanStore((s) => s.plan);
  const addRuinRule = usePlanStore((s) => s.addRuinRule);
  const updateRuinRule = usePlanStore((s) => s.updateRuinRule);
  const removeRuinRule = usePlanStore((s) => s.removeRuinRule);

  const addControl = (
    <Select
      className="h-8 w-[7.75rem] shrink-0 px-1.5 text-xs md:h-8"
      value=""
      onChange={(e) => {
        const t = e.target.value as RuinRule["type"];
        if (t) addRuinRule(t);
        e.target.value = "";
      }}
    >
      <option value="">条件を追加</option>
      <option value="depleted">期間中に閾値割れ</option>
      <option value="below_at_age">指定年齢で閾値割れ</option>
      <option value="years_of_spend">支出N年分を下回る</option>
    </Select>
  );

  const content = (
    <>
      <p className="mb-3 text-xs leading-relaxed text-fg-subtle">
        どれか一つに該当した経路を資産枯渇とみなす（論理和）。初期値は「期間中に資産が0円以下」。100歳時点の残額で判定したい場合はチェックポイントを足す。
      </p>
      {plan.ruinRules.length === 0 ? (
        <p className="rounded-md bg-bg-sunken px-3 py-2 text-sm text-fg-muted">
          判定条件はありません。計算はできますが、すべての経路が計画達成扱いになります。
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {plan.ruinRules.map((rule) => (
            <li
              key={rule.id}
              className="flex flex-col gap-2 rounded-lg bg-surface-2 p-3 shadow-[var(--shadow-border)] sm:flex-row sm:items-center"
            >
              <span className="text-sm text-fg sm:min-w-40">{RUIN_TYPE_LABEL[rule.type]}</span>
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {rule.type === "depleted" ? (
                  <Num
                    label="閾値（万円）"
                    value={rule.threshold}
                    onChange={(threshold) => updateRuinRule(rule.id, { ...rule, threshold })}
                  />
                ) : null}
                {rule.type === "below_at_age" ? (
                  <>
                    <Num
                      label="年齢"
                      value={rule.age}
                      onChange={(age) => updateRuinRule(rule.id, { ...rule, age })}
                    />
                    <Num
                      label="金額（万円）"
                      value={rule.amount}
                      onChange={(amount) => updateRuinRule(rule.id, { ...rule, amount })}
                    />
                  </>
                ) : null}
                {rule.type === "years_of_spend" ? (
                  <Num
                    label="年数"
                    value={rule.years}
                    onChange={(years) => updateRuinRule(rule.id, { ...rule, years })}
                  />
                ) : null}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="条件を削除"
                onClick={() => removeRuinRule(rule.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3"
        onClick={() => addRuinRule("below_at_age")}
      >
        <Plus className="size-4" />
        {plan.endAge}歳時点で0円なら資産枯渇
      </Button>
    </>
  );

  if (plain) {
    return (
      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-fg">資産枯渇条件</h3>
          {addControl}
        </div>
        {content}
      </div>
    );
  }

  if (embedded) {
    return (
      <details className="group mt-4 rounded-lg border border-border bg-bg-sunken/45 px-3 py-2.5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm text-fg [&::-webkit-details-marker]:hidden">
          <span>資産枯渇条件</span>
          <span className="flex items-center gap-2 text-xs text-fg-muted">
            {plan.ruinRules.length}件
            <i className="type-caption not-italic transition-transform group-open:rotate-180">▼</i>
          </span>
        </summary>
        <div className="mt-3 border-t border-border pt-3">
          <div className="mb-3 flex justify-end">{addControl}</div>
          {content}
        </div>
      </details>
    );
  }

  return (
    <SectionCard title="資産枯渇条件の設定" titleNowrap action={addControl}>
      {content}
    </SectionCard>
  );
}

function Num({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-fg-muted">
      {label}
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-9 w-24 md:h-9"
      />
    </label>
  );
}
