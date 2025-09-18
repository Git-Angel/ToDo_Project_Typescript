import React from "react";

function skeleton() {
  return (
    <div className="m-0-auto mx-auto w-full max-w-sm">
      <div className="mx-auto w-full max-w-sm rounded-md border border-emerald-300 p-4">
        <div className="flex animate-pulse space-x-4">
          <div className="size-10 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div className="h-2 rounded bg-gray-200"></div>
              <p className="ml-5 text-gray-500 dark:text-gray-400">
                Page Loading, please wait...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default skeleton;
