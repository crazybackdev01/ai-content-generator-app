"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contentTemplates } from "@/lib/ContentTemplates";
import { Loader2 } from "lucide-react";
import { chatSession } from "@/lib/geminiAI";
import { useState } from "react";
import { Editor } from "./_components/Editor";
import axios from "axios";
import { title } from "process";

interface templateSlugProps {
  templateSlug: string;
}

export default function Page({ params }: { params: templateSlugProps }) {
  const [isLoading, setisLoading] = useState(false);
  const [aiOutput, setAIOutput] = useState<string>("");

  const selectedTemplate = contentTemplates.find(
    (item) => item.slug === params.templateSlug
  );

  async function generateAIResponse(formdata: FormData) {
    setisLoading(true);
    try {
      // Define the dataset
      let dataset = {
        title: formdata.get("title"),
        description: formdata.get("description"),
      };

      // Define the prompt for AI
      const selectedAIPrompt = selectedTemplate?.aiPrompt;
      // Define the final prompt for AI by concatenating the above selectedAIPrompt string variable with the Stringified version of the dataset variable that is JSON.stringify(dataset) because the AI API will take the prompt into string format.
      const finalAIPrompt = JSON.stringify(dataset) + ", " + selectedAIPrompt;

      const resultFromApi = await chatSession.sendMessage(finalAIPrompt);

      setAIOutput(resultFromApi.response.text());

      const response = await axios.post("/api/", {
        templateUsed: selectedTemplate?.name,
        title: dataset.title,
        description: resultFromApi.response.text(),
      });
      console.log("Saving history API request response: ", response);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  const handleGenerate = async (formdata: FormData) => {
    generateAIResponse(formdata);
  };

  // if (!selectedTemplate) return <div>No Template exists with this Name</div>;

  return (
    <div className="mx-5 py-2">
      <div className="mt-5 py-6 px-4 bg-white rounded">
        <h2 className="font-medium">{selectedTemplate?.name}</h2>
      </div>
      {/* 
      on Clicking submit button of the below form, The client is automatically getting redirected to http://localhost:3000/dashboard/youtube-description?title=&description= URL with a GET request by default
      GET /dashboard/youtube-description?title=Udit&description=nagar 200 in 175ms
      */}
      <form action={handleGenerate}>
        <div className="flex flex-col gap-4 p-5 mt-5 bg-white">
          {selectedTemplate?.form?.map((form) => (
            <div key={form.field}>
              <label>{form.label}</label>
              {form.field === "input" ? (
                <div className="mt-5">
                  <Input name="title"></Input>
                </div>
              ) : (
                <div className="mt-5">
                  <Textarea name="description" />
                </div>
              )}
            </div>
          ))}
        </div>
        <Button className="mt-5" type="submit">
          {isLoading ? (
            <Loader2 className="animate-spin"></Loader2>
          ) : (
            "Generate Content"
          )}
        </Button>
      </form>
      <div className="my-10">
        <Editor value={isLoading ? "Generating..." : aiOutput} />
      </div>
    </div>
  );
}
