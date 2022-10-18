import * as T from "@radix-ui/react-tooltip"
import styled from "@emotion/styled"
import React from "react"

export { Tooltip }

function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <T.Provider>
        <T.Root>{children}</T.Root>
      </T.Provider>
    </div>
  )
}

export const TooltipTrigger = styled(T.Trigger)`
  border: none;
  background-color: inherit;
  color: inherit;
`

export const TooltipContent = styled(T.Content)``
