import { Dispatch, SetStateAction } from "react"
import { Textarea } from "./src/ui/textarea"

type TextareaWithLabelInputProps = {
  userPrompt: string,
  setUserPrompt : Dispatch<SetStateAction<string>>
}

export function TextareaWithLabel({userPrompt, setUserPrompt}: TextareaWithLabelInputProps) {
    return (
      <div className="grid gap-1.5 w-full ">
        <Textarea onChange={(e)=>{
          setUserPrompt(pr => e.target.value)
          
        }} placeholder="Type your response ...." id="message" value={userPrompt} />
      </div>
    )
  }