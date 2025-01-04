import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const history = await db.aIOutput.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div>
      <Table>
        <TableCaption>A list of your ai output history.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Template</TableHead>
            <TableHead className="w-[250px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history && history.length > 0
            ? history.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.templateUsed}</TableCell>
                  <TableCell className="w-[250px]">{question.title}</TableCell>
                  <TableCell className="whitespace-pre-wrap">
                    {question.description}
                  </TableCell>
                  <TableCell className="text-right">
                    {format(question.createdAt, "MM/dd/yyyy")}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
