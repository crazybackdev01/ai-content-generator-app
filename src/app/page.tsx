import Auth from "@/components/Auth";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { Rocket, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// ○  (Static)   prerendered as static content
// ƒ  (Dynamic)  server-rendered on demand

/*
Route (app)                              Size     First Load JS
┌ ƒ /                                    1.98 kB         130 kB
├ ○ /_not-found                          875 B          88.2 kB
├ ○ /dashboard                           18.3 kB         150 kB
├ ƒ /dashboard/[templateSlug]            11.1 kB         107 kB
├ ○ /dashboard/history                   140 B          87.5 kB
├ ○ /dashboard/upgrade                   139 B          87.5 kB
├ ƒ /sign-in/[[...sign-in]]              1.96 kB         119 kB
└ ƒ /sign-up/[[...sign-up]]              1.96 kB         119 kB
+ First Load JS shared by all            87.3 kB
  ├ chunks/23-49be6b6f2c6f2af3.js        31.5 kB
  ├ chunks/fd9d1056-9dbc1ff33bfde955.js  53.7 kB
  └ other shared chunks (total)          2.13 kB
*/

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 mt-4 lg:px-6 h-14 flex items-center">
        <Link className="flex flex-col items-center justify-center" href="/">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Auth />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Content Generator App
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  We are revolutionizing the way you work. Join us on this
                  exciting journey to transform your business.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href={"/sign-up"}>Get Started</Link>
                </Button>
                {/* <Button variant="outline">Learn More</Button> */}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Zap className="h-10 w-10" />
                <h2 className="text-xl font-bold">Lightning Fast</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our platform is optimized for speed, ensuring you get results
                  quickly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Shield className="h-10 w-10" />
                <h2 className="text-xl font-bold">Secure & Reliable</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your data is safe with us. We use state-of-the-art security
                  measures.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Rocket className="h-10 w-10" />
                <h2 className="text-xl font-bold">Scalable Solution</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Grow your business with confidence. Our platform scales with
                  you.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to get started?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of satisfied customers and take your business
                  to the next level.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By subscribing, you agree to our Terms & Conditions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
