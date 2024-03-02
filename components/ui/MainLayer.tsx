"use client";
import { FormEvent, SVGProps, useCallback, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "./Button";

type TReqState = {
  message: "ok";
  error: "string";
  isError: boolean;
};

export function MainLayer() {
  const [reqState, setReqState] = useState<TReqState | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    setLoading(true);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setReqState(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section key="1" className="">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Instant Job Notifications
          </h1>
          <div className="space-y-2">
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Get instant job notifications on Telegram. Our automated job alert
              system delivers the latest job openings directly to you, saving
              you time and effort in your job search.
              <br />
              Be the first who apply for vacancies!
            </p>
          </div>
          <div className="grid gap-4 sm:gap-8 lg:gap-4 font-mono">
            <div className="flex items-center space-x-4 sm:space-x-8 lg:gap-2">
              <CheckCircleIcon className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Instant Notifications
              </span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-8 lg:gap-2">
              <CheckCircleIcon className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Preferred Vacancy Site
              </span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-8 lg:gap-2">
              <CheckCircleIcon className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Filtered Search Criteria
              </span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-8 lg:gap-2">
              <CheckCircleIcon className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Unlimited Job Listings
              </span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-8 lg:gap-2">
              <CheckCircleIcon className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Customized Job Alerts
              </span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-8 lg:gap-2">
              <CheckCircleIcon className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Continuous Work 24/7
              </span>
            </div>
          </div>
          <p className="pt-6 text-gray-500 text-sm dark:text-gray-400 font-medium">
            Ready to try for just $2/month?
            <br />
            Enter your email to contact me with any questions about membership.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <form className="flex space-x-2" onSubmit={onSubmit}>
              <Input
                required
                className="max-w-lg flex-1"
                placeholder="Email address"
                name="email"
                type="email"
                disabled={reqState?.isError || reqState?.message === "ok"}
              />
              <Button
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                disabled={
                  reqState?.isError || reqState?.message === "ok" || loading
                }
                type="submit"
              >
                Try
              </Button>
            </form>
          </div>
          {loading && (
            <p className="text-grey-500 text-sm dark:text-gray-400">
              Processing...
            </p>
          )}
          {reqState?.isError && (
            <p className="text-red-500 text-sm dark:text-red-400">
              {reqState.error}!
            </p>
          )}
          {reqState?.message === "ok" && (
            <p className="text-green-500 text-sm dark:text-green-400">
              We will respond to you as soon as possible. Thanks!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
