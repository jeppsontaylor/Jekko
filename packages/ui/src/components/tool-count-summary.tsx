import { Index, createMemo } from "solid-js"
import { AnimatedCountLabel } from "./tool-count-label"

export type CountItem = {
  key: string
  count: number
  one: string
  other: string
}

export function AnimatedCountList(props: { items: CountItem[]; alternative_path?: string; class?: string }) {
  const visible = createMemo(() => props.items.filter((item) => item.count > 0))
  const alternative_path = createMemo(() => props.alternative_path ?? "")
  const showEmpty = createMemo(() => visible().length === 0 && alternative_path().length > 0)

  return (
    <span data-component="tool-count-summary" class={props.class}>
      <span data-slot="tool-count-summary-empty" data-active={showEmpty() ? "true" : "false"}>
        <span data-slot="tool-count-summary-empty-inner">{alternative_path()}</span>
      </span>

      <Index each={props.items}>
        {(item, index) => {
          const active = createMemo(() => item().count > 0)
          const hasPrev = createMemo(() => {
            for (let i = index - 1; i >= 0; i--) {
              if (props.items[i].count > 0) return true
            }
            return false
          })

          return (
            <>
              <span data-slot="tool-count-summary-prefix" data-active={active() && hasPrev() ? "true" : "false"}>
                ,
              </span>
              <span data-slot="tool-count-summary-item" data-active={active() ? "true" : "false"}>
                <span data-slot="tool-count-summary-item-inner">
                  <AnimatedCountLabel
                    one={item().one}
                    other={item().other}
                    count={Math.max(0, Math.round(item().count))}
                  />
                </span>
              </span>
            </>
          )
        }}
      </Index>
    </span>
  )
}
