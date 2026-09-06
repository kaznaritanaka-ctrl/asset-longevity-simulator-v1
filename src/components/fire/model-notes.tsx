export function ModelNotes() {
  return (
    <article className="min-w-0 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5 md:p-6">
      <details className="group">
        <summary className="flex cursor-pointer list-none flex-col [&::-webkit-details-marker]:hidden">
          <p className="text-[11px] font-medium tracking-[0.16em] text-fg-subtle uppercase">
            Model
          </p>
          <h2 className="mt-1 flex items-center gap-2 font-display text-2xl text-fg">
            設計
            <span
              aria-hidden
              className="text-xs leading-none text-fg-subtle transition-transform duration-150 group-open:rotate-180"
            >
              ▼
            </span>
          </h2>
        </summary>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
          この計算機は、資産形成期と取り崩し期を別の配分・別のキャッシュフローとして扱い、資産クラスごとの期待リターンとリスク、クラス間の相関を乗せてモンテカルロ経路を描く。破綻は「資産がゼロ」に限らず、自分で置いた条件で判定する。
        </p>

        <ol className="mt-6 grid gap-5 md:grid-cols-2">
          <Note n="1" title="二段階のライフサイクル">
            現在年齢からFIRE年齢までを形成期（積立）、その後シミュレーション終了年齢までを取り崩し期（支出）とする。年金は指定年齢から毎年生える。配分は期ごとに変えられるので、取崩期だけ債券を厚くする、といったグライドパスを表現できる。
          </Note>
          <Note n="2" title="資産クラスのリターンとリスク">
            既定値は JST Macrohistory（株式・国債・手形）と金価格（1960年以降は World Bank Pink Sheet、それ以前は出典検証中）を、日本CPIと円ドルで実質円建てにしたもの。算術平均と年率σをクラスごとに置き、相関付き正規乱数（コレスキー）で年次リターンを振る。年1回リバランス。出典ウィンドウ（最長／戦後／変動相場制）で差し替えられる。
          </Note>
          <Note n="3" title="ユーザー定義の破綻">
            期間中の閾値割れ、指定年齢での残額、支出のN年分を下回る、の三つ。複数条件は論理和。例:「100歳時点で資産ゼロなら破綻」はチェックポイント条件として足す。
          </Note>
          <Note n="4" title="経路の数え方">
            毎年、年初にキャッシュフローを適用し、その後リターンを乗せる。取崩期は手取り支出を保つため、売却額 = 不足分 / (1−税率)。負の資産は0に切り上げ、条件に触れれば破綻フラグを立てて経路は続ける。破綻した経路から無作為に一本、中央の帯にいちばん近い一本、をそれぞれ拾って語る。
          </Note>
          <Note n="5" title="資産寿命と平均余命">
            厚生労働省「令和7年簡易生命表」の男女別 e_x・l_x を、現在年齢からの条件付きで重ねる。資産の生存曲線はモンテカルロ、生命の曲線は生命表。経路自体は死亡で打ち切らない。性別は比較欄のトグルで切り替える。
          </Note>
        </ol>

        <div className="mt-6 rounded-lg bg-bg-sunken/80 px-4 py-3 text-xs leading-relaxed text-fg-muted">
          入っていないもの: 取得費ベースの譲渡税・NISA枠・配当課税、手数料、ファットテール（正規乱数）、インフレの確率過程、柔軟な取崩ルール、死亡による経路の打ち切り。過去の平均は将来の保証ではない。数値は判断材料であり、助言ではない。
        </div>
      </details>
    </article>
  );
}

function Note({ n, title, children }: { n: string; title: string; children: string }) {
  return (
    <li className="rounded-lg bg-surface-2 p-4 shadow-[var(--shadow-border)]">
      <p className="text-[11px] tabular-nums text-fg-subtle">{n}</p>
      <h3 className="mt-1 font-display text-lg text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{children}</p>
    </li>
  );
}
