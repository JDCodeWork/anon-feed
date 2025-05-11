import { Tabs, TabsList, TabsTrigger } from "@components/ui"
import { TabDetails } from "./TabDetails"
import { TabMedia } from "./TabMedia"
import { TabFeedback } from "./TabFeedback"
import { useState } from "react"

type Tabs = "details" | "media" | "feedback";

export const TabsForm = () => {
	const [activeTab, setActiveTab] = useState<Tabs>("details");

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as Tabs)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Project Details</TabsTrigger>
        <TabsTrigger value="media">Media & Links</TabsTrigger>
        <TabsTrigger value="feedback">Feedback Goals</TabsTrigger>
      </TabsList>

      <TabDetails onNext={() => setActiveTab("media")} />
      <TabMedia
        onPrev={() => setActiveTab("details")}
        onNext={() => setActiveTab("feedback")}
      />
      <TabFeedback
        onPrev={() => setActiveTab("media")}
        onSubmit={() => alert("uploading project")}
      />
    </Tabs>
  )
}