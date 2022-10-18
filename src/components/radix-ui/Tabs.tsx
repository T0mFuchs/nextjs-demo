import * as T from "@radix-ui/react-tabs"
import styled from "@emotion/styled"

export const Tabs = styled(T.Root)``
export const TabsList = styled(T.List)``
export const TabsTrigger = styled(T.Trigger)`
  border: none;
  background-color: inherit;
  color: inherit;
  &[data-state="active"] {
    color: #377dff;
    background-color: #f9f4da;
    border-radius: .25rem;
  }
  &[data-state="inactive"] {
    color: #323330;
  }
`
export const TabsContent = styled(T.Content)`
  background-color: #377dff;
  border-radius: .5rem;
  padding: .2rem;
`
