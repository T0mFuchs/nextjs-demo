import {
  Popover,
  PopoverTrigger,
  PopoverContentTop,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../radix-ui";

export { PopoverTabs };

function PopoverTabs() {
  return (
    <>
      <Popover>
        <PopoverTrigger>``👆``</PopoverTrigger>
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
    </>
  );
}
