import { Textarea } from "./src/ui/textarea"

export function TextareaWithLabel() {
    return (
      <div className="grid gap-1.5 w-full ">
        <Textarea placeholder="Type your response ...." id="message" />
      </div>
    )
  }