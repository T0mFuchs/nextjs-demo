import React from "react"
import { Icon } from "@iconify/react"
import { css } from "@emotion/react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "../components/radix-ui/Dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/radix-ui/Accordion"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/radix-ui/Tabs"
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from "../components/radix-ui/Toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/radix-ui/AlertDialog"
import {
  Popover,
  PopoverContentTop,
  PopoverTrigger,
} from "../components/radix-ui/Popover"

export async function getServerSideProps() {
  const url = process.env.BASE_URL
  return { props: { url } }
}

function Home({ url }: { url: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <h2
        css={css`
          font-size: 1.33rem;
          font-weight: 900;
        `}
      >
        {`${url}/`}
      </h2>
      <div
        css={css`
          padding-top: 7rem;
        `}
      >
        <div>
          <Popover>
            <PopoverTrigger>popover 👆</PopoverTrigger>
            <PopoverContentTop>
              <Tabs defaultValue="tab1">
                <TabsContent value="tab1">tab1.content</TabsContent>
                <TabsContent value="tab2">tab2.content</TabsContent>
                <TabsList aria-label="tabs component">
                  <TabsTrigger value="tab1">tab1.trigger</TabsTrigger>
                  <TabsTrigger value="tab2">tab2.trigger</TabsTrigger>
                </TabsList>
              </Tabs>
            </PopoverContentTop>
          </Popover>
        </div>
        <Dialog>
          <DialogTrigger>``dialog trigger``</DialogTrigger>
          <div>
            <DialogContent>
              <h3>accordion {`type="single"`}</h3>
              <Accordion type="single" defaultValue="item1">
                <AccordionItem value="item1">
                  <AccordionTrigger>item1.trigger1</AccordionTrigger>
                  <AccordionContent>item1.content1</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item2">
                  <AccordionTrigger>item2.trigger2</AccordionTrigger>
                  <AccordionContent>item2.content3</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item3">
                  <AccordionTrigger>item3.trigger3</AccordionTrigger>
                  <AccordionContent>item3.content3</AccordionContent>
                </AccordionItem>
              </Accordion>
              <DialogClose>
                <Icon icon="line-md:close" fontSize={25} />
              </DialogClose>
            </DialogContent>
          </div>
        </Dialog>
        <Toast>
          <button
            onClick={() => setOpen(true)}
            css={css`
              border: none;
              background-color: inherit;
              color: inherit;
            `}
          >
            ``toast trigger``
          </button>
          <ToastRoot open={open} onOpenChange={setOpen}>
            <ToastTitle>`` swipe right ``</ToastTitle>
            <ToastDescription>`toast`</ToastDescription>
            <ToastAction altText="undo toast">
              <Icon icon="line-md:close" color="#d24e59" fontSize={20} />
            </ToastAction>
          </ToastRoot>
          <ToastViewport />
        </Toast>
        <AlertDialog>
          <AlertDialogTrigger>alert dialog trigger</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>interactivity blocked</AlertDialogTitle>
            <AlertDialogDescription>
              ``alert description``
            </AlertDialogDescription>
            <AlertDialogCancel>
              <Icon icon="line-md:close" color="#d24e59" fontSize={40} />
            </AlertDialogCancel>
            <AlertDialogAction>
              <Icon icon="line-md:confirm" color="#148700" fontSize={40} />
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default Home
