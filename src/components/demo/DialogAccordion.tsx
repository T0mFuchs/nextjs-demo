import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../radix-ui";

export { DialogAccordion };

function DialogAccordion() {
  return (
    <>
      <Dialog>
        <DialogTrigger>``dialog trigger``</DialogTrigger>
        <div>
          <DialogContent>
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
    </>
  );
}
